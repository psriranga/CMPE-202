from django.db import models
import uuid

class CastMember(models.Model):
    name = models.CharField(max_length=255)
    featured_as = models.CharField(max_length=255)
    img = models.URLField()  # Assuming the image is hosted online

    def __str__(self):
        return self.name

class Movie(models.Model):
    name = models.CharField(max_length=255)
    runtime = models.CharField(max_length=10, default='120 min')
    genre = models.CharField(max_length=255, default='Default Genre')
    rating = models.FloatField()
    show_timings = models.JSONField(default=list)  # Assuming a list of strings
    description = models.TextField()

    def __str__(self):
        return self.name

