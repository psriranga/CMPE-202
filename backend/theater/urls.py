from django.urls import path
from theater.views import TheaterCreateAPI


urlpatterns = [
    path("theater", TheaterCreateAPI.as_view(), name="theater-create-api"),
]
