from django.contrib.gis.db.models import PointField
from common.models import BaseModel
from django.db import models


# Create your models here.
class Theater(BaseModel):
    name = models.CharField(max_length=128)
    location = PointField()
    zip_code = models.CharField(max_length=8)
    technologies = models.JSONField(default=list)
    seatingCategories = models.JSONField(default=list)
    cuisines = models.JSONField(default=list)
    def __str__(self):
        return f"<Theater {self.name}>"
