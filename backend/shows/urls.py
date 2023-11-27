from django.urls import path
from .views import CreateShowsView, ShowGetDeleteAPI, ShowsGetByMovieAPI

urlpatterns = [
    path('create/shows', CreateShowsView.as_view(), name='create-shows'),
    path('show/<int:id>', ShowGetDeleteAPI.as_view(), name='show-get-delete-api'),
    path('get-shows/<int:movie_id>', ShowsGetByMovieAPI.as_view(), name='get-shows-by-movie-id')
]
