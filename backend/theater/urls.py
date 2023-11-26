from django.urls import path
from theater.views import TheaterListCreateAPI, TheaterGetAPI


urlpatterns = [
    path("theater", TheaterListCreateAPI.as_view(), name="theater-list-create-api"),
    path("theater/<int:pk>", TheaterGetAPI.as_view(), name="theater-get-api"),
]
