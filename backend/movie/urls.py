from django.urls import path
from movie.views import MovieListCreateAPI, MovieGetAPI

urlpatterns = [
    path("movie", MovieListCreateAPI.as_view(), name="movie-list-create-api"),
    path("movie/<int:pk>", MovieGetAPI.as_view(), name="movie-get-api"),
]
