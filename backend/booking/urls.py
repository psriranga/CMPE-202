from django.urls import path
from booking.views import TicketGetCreateAPI

urlpatterns = [
    path("ticket", TicketGetCreateAPI.as_view(), name="ticket-get-create-api"),
]
