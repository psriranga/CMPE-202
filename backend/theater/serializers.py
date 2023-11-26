from rest_framework import serializers
from django.contrib.gis.geos import Point
from .models import Theater

class PointFieldSerializer(serializers.Field):
    def to_representation(self, value):
        return {"latitude": value.y, "longitude": value.x}

    def to_internal_value(self, data):
        try:
            # Ensure the latitude and longitude are present in the data.
            latitude = float(data['latitude'])
            longitude = float(data['longitude'])
            return Point(longitude, latitude)
        except (TypeError, KeyError):
            raise serializers.ValidationError("Longitude and latitude fields must be included.")

class TheaterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=128)
    address = serializers.CharField()
    short_address = serializers.CharField()
    location = PointFieldSerializer()
    zip_code = serializers.CharField(max_length=8)
    technologies = serializers.JSONField(default=list)
    cuisines = serializers.JSONField(default=list)
    shows = serializers.JSONField(default=list)
    no_of_rows = serializers.IntegerField(default=0)
    no_of_cols = serializers.IntegerField(default=0)

    def create(self, validated_data):
        return Theater.objects.create(**validated_data)

class TheaterOutputSerializer(TheaterSerializer):
    id = serializers.IntegerField()