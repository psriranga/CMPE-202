# from django.shortcuts import render, get_object_or_404, redirect
# from django.views.generic import CreateView, UpdateView, DeleteView
# from django.urls import reverse_lazy
# from .models import Show
# from .forms import ShowForm

# def show_list(request):
#     shows = Show.objects.all()
#     return render(request, 'show_list.html', {'shows': shows})

# class ShowCreateView(CreateView):
#     model = Show
#     form_class = ShowForm
#     template_name = 'show_form.html'
#     success_url = reverse_lazy('show_list')

# class ShowUpdateView(UpdateView):
#     model = Show
#     form_class = ShowForm
#     template_name = 'show_form.html'
#     success_url = reverse_lazy('show_list')

# class ShowDeleteView(DeleteView):
#     model = Show
#     template_name = 'show_confirm_delete.html'
#     success_url = reverse_lazy('show_list')



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from .models import Show, Movie, Theater
from movie.serializers import MovieSerializer
from theater.serializers import TheaterSerializer

class CreateShowsView(APIView):
    def post(self, request, format=None):
        data = request.data
        movie_id = data.get('movie_id')
        theater_id_list = data.get('theater_id_list')
        start_date = datetime.fromisoformat(data.get('start_date'))
        end_date = datetime.fromisoformat(data.get('end_date'))

        if not movie_id or not theater_id_list or not start_date or not end_date:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        date_range = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]
        for show_date in date_range:
            for theater_id in theater_id_list:
                try:
                    theater = Theater.objects.get(id=theater_id)
                    movie = Movie.objects.get(id=movie_id)
                    for show_time in theater.shows:
                        show_datetime = datetime.combine(show_date, datetime.strptime(show_time, '%H:%M').time())
                        seat_matrix = [[0 for _ in range(theater.no_of_cols)] for _ in range(theater.no_of_rows)]
                        print(theater, movie)
                        Show.objects.create(movie=movie, theater=theater, show_timing=show_datetime, seat_matrix=seat_matrix, no_of_rows=theater.no_of_rows, no_of_cols=theater.no_of_cols)
                except (Movie.DoesNotExist, Theater.DoesNotExist):
                    return Response({'error': f'Movie or Theater with provided ID not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'Shows created successfully'}, status=status.HTTP_201_CREATED)

class GetShowByIdView(APIView):
    def get(self, request, id, format=None):
        try:
            show = Show.objects.get(id=id)
            movie_serializer = MovieSerializer(show.movie)
            theater_serializer = TheaterSerializer(show.theater)
            response_data = {
                "movie": movie_serializer.data,
                "theater": theater_serializer.data,
                "seat_matrix": show.seat_matrix,
                "runtime": show.movie.runtime  # Assuming runtime is part of the Movie model
            }
            return Response(response_data)
        except Show.DoesNotExist:
            return Response({'error': 'Show not found'}, status=status.HTTP_404_NOT_FOUND)