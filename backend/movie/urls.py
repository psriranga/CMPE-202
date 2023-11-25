from django.urls import path
from .views import movie_list, movie_detail, CreateMovieView, GetMovieByIdView, GetAllMoviesView

urlpatterns = [
    path('movies/', movie_list, name='movie_list'),
    path('movies/<int:movie_id>/', movie_detail, name='movie_detail'),
    # path('movies/create/', MovieCreateView.as_view(), name='movie_create'),
    path('movies/create/', CreateMovieView.as_view(), name='create-movie'),
    path('movies/get-movie/<int:id>/', GetMovieByIdView.as_view(), name='get-movie-by-id'),
    path('movies/get-all-movies/', GetAllMoviesView.as_view(), name='get-all-movies'),


    # Add other URL patterns as needed
]
