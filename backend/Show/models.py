from django.db import models
from theater.models import Theater
import uuid

class Show(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    movie = models.CharField(max_length=255)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
    show_timings = models.JSONField(default=list)  # Assuming a list of strings
    runtime = models.CharField(max_length=10)
    remaining_seats = models.JSONField(default=list)  # Assuming a list of strings
    no_of_rows = models.IntegerField()
    no_of_cols = models.IntegerField()
    def __str__(self):
        return f"{self.movie} at {self.theatre} - {self.show_timings}"