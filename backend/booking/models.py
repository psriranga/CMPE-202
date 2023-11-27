from django.db import models
from theater.models import Theater
from movie.models import Movie
from shows.models import Show

class Ticket(models.Model):
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    price = models.FloatField(blank=True, null=True)
    seats = models.JSONField(default=list)
    def __str__(self):
        return f"{self.id}   -   {self.show}   -   {self.price}"