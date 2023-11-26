from django.urls import path
from movie.views import MovieListCreateAPI, MovieGetDeleteAPI

urlpatterns = [
    path("movie", MovieListCreateAPI.as_view(), name="movie-list-create-api"),
    path("movie/<int:pk>", MovieGetDeleteAPI.as_view(), name="movie-get-delete-api"),
]
