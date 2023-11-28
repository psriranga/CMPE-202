from django.db import models
from theater.models import Theater
from movie.models import Movie
from shows.models import Show
from account.models import User
from common.models import BaseModel

class Ticket(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    ticket_price = models.FloatField(blank=True, null=True)
    service_fee = models.FloatField(blank=True, null=True)
    seats = models.JSONField(default=list)
    def __str__(self):
        return f"{self.id}   -   {self.show}   -   {self.price}"