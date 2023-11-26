from django.urls import path
from theater.views import TheaterListCreateAPI, TheaterGetDeleteAPI


urlpatterns = [
    path("theater", TheaterListCreateAPI.as_view(), name="theater-list-create-api"),
    path("theater/<int:pk>", TheaterGetDeleteAPI.as_view(), name="theater-get-api"),
]
