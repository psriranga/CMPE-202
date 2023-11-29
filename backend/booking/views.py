from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from booking.models import Ticket
from shows.models import Show
from account.serializers import SignUpSerializer
from booking.serializers import TicketSerializer
from theater.serializers import TheaterOutputSerializer
from movie.serializers import MovieSerializer
from backend.settings import SERVICE_FEE
from account.models import User
from django.utils import timezone


class TicketCreateAPI(APIView):
    def post(self, request):
        data = request.data
        try:
            show = Show.objects.get(id=data["show"])
        except Show.DoesNotExist:
            return Response({'error': 'Invalid Show ID'}, status=status.HTTP_404_NOT_FOUND)
        if "user" in data:
            try:
                user = User.objects.get(id=data["user"])
            except User.DoesNotExist:
                return Response({'error': 'Invalid User ID'}, status=status.HTTP_404_NOT_FOUND)
        else:
            user_data = {}
            user_data["email"] = data["email"]
            user_data["phoneNumber"] = data["phone_number"]
            user_data["name"] = data["name"]
            user_data["role"] = User.GUEST_USER
            user_data["rewardPoints"] = 0
            user_data["is_admin"] = False
            user_data["password"] = "cmpe2020GuestUser"
            user_data["confirm_password"] = "cmpe2020GuestUser"
            serializer = SignUpSerializer(data=user_data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            data.pop("email")
            data.pop("phone_number")
            data.pop("name")
            
        dollars = data.get("dollars", 0)
        reward_points = data.get("reward_points", 0)/100
        if dollars+reward_points!=data.get("ticket_price",0)+data.get("service_fee", 0):
            return Response({"error": "Incomplete payment"}, status=status.HTTP_400_BAD_REQUEST)
        if len(data.get("seats", []))>8:
            return Response({"error": "You cannot book more than 8 tickets"}, status=status.HTTP_400_BAD_REQUEST)
        for seat in data["seats"]:
            if seat in show.seat_matrix:
                return Response({"error": f"Seat: {seat} is already booked"}, status=status.HTTP_400_BAD_REQUEST)
        show.seat_matrix.extend(data["seats"])
        show.seat_matrix.sort()
        show.save()
        data["show"]=show
        data["user"] = user
        data["status"] = Ticket.CONFIRMED
        ticket = Ticket.objects.create(**data)
        movie_serializer = MovieSerializer(show.movie)
        theater_serializer = TheaterOutputSerializer(show.theater)
        ticket = TicketSerializer(ticket).data
        ticket["movie"] = movie_serializer.data
        ticket["theater"] = theater_serializer.data
        user.rewardPoints += int(ticket["dollars"])
        user.save()
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


class TicketCancelAPI(APIView):
    def patch(self, request, ticket_id):
        try:
            ticket = Ticket.objects.get(id=ticket_id)
            show = ticket.show
            if show.show_timing>timezone.now():
                return Response({"error": "Cannot cancel ticket as the show has already started or completed"}, status=status.HTTP_400_BAD_REQUEST)
            movie_serializer = MovieSerializer(ticket.show.movie)
            theater_serializer = TheaterOutputSerializer(ticket.show.theater)
            user = ticket.user
            user.rewardPoints -= ticket.dollars//1
            user.save()
            ticket.status=Ticket.CANCELLED
            ticket.save()
            show = ticket.show
            show.seat_matrix = [item for item in show.seat_matrix if item not in ticket.seats]
            show.save()
            ticket = TicketSerializer(ticket).data
            ticket["movie"] = movie_serializer.data
            ticket["theater"] = theater_serializer.data
            return Response({"ticket": ticket})
        except Ticket.DoesNotExist:
            return Response({'message': 'Ticket not found'}, status=status.HTTP_404_NOT_FOUND)
