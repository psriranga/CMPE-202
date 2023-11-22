from rest_framework import serializers

from rest_framework import serializers
from theater.models import Theater
from theater.selectors import theater_get
from core.errors import MissingResource

from django.contrib.gis.geos import Point
from .models import Theater


class PointFieldSerializer(serializers.Field):
    def to_representation(self, value):
        return {"latitude": value.y, "longitude": value.x}

    def to_internal_value(self, data):
        return Point(float(data["longitude"]), float(data["latitude"]))


class TheaterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128)
    location = PointFieldSerializer()
    zip_code = serializers.CharField()

    def create(self, validated_data):
        return Theater.objects.create(**validated_data)
