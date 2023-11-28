from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from booking.models import Ticket
from shows.models import Show
from booking.serializers import TicketSerializer
from theater.serializers import TheaterOutputSerializer
from movie.serializers import MovieSerializer
from backend.settings import SERVICE_FEE
from account.models import User
# Create your views here.
class TicketCreateAPI(APIView):
    def post(self, request):
        data = request.data
        try:
            show = Show.objects.get(id=data["show"])
        except Show.DoesNotExist:
            return Response({'error': 'Invalid Show ID'}, status=status.HTTP_404_NOT_FOUND)
        try:
            user = User.objects.get(id=data["user"])
        except User.DoesNotExist:
            return Response({'error': 'Invalid User ID'}, status=status.HTTP_404_NOT_FOUND)
        for seat in data["seats"]:
            if seat in show.seat_matrix:
                return Response({"error": f"Seat: {seat} is already booked"}, status=status.HTTP_400_BAD_REQUEST)
        data["ticket_price"] = show.price*len(data["seats"])
        data["service_fee"] = SERVICE_FEE
        show.seat_matrix.extend(data["seats"])
        show.seat_matrix.sort()
        show.save()
        data["show"]=show
        data["user"] = user
        ticket = Ticket.objects.create(**data)
        movie_serializer = MovieSerializer(show.movie)
        theater_serializer = TheaterOutputSerializer(show.theater)
        ticket = TicketSerializer(ticket).data
        ticket["movie"] = movie_serializer.data
        ticket["theater"] = theater_serializer.data
        return Response({"ticket": ticket})

class TicketGetAPI(APIView):
    def get(self, request, ticket_id):
        try:
            ticket = Ticket.objects.get(id=ticket_id)
            movie_serializer = MovieSerializer(ticket.show.movie)
            theater_serializer = TheaterOutputSerializer(ticket.show.theater)
            ticket = TicketSerializer(ticket).data
            ticket["movie"] = movie_serializer.data
            ticket["theater"] = theater_serializer.data
            return Response({"ticket": ticket})
        except Ticket.DoesNotExist:
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)