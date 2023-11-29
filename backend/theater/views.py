from theater.serializers import TheaterSerializer, TheaterOutputSerializer, TheaterUpdateSerializer, TheaterFilterSerializer
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from theater.models import Theater
from core.mixins import ApiAuthenticationMixin
from core.errors import MissingResource
from theater.services import theater_create
from geopy.geocoders import Nominatim
from geopy.distance import geodesic 
import random

class TheaterListCreateAPI(APIView):
    Serializer = TheaterSerializer

    def post(self, request):
        geolocator = Nominatim(user_agent=f"User agent: {random.randint(1,10000)}")
        data = request.data
        location = geolocator.geocode(data["address"])
        data["location"] = {
            "latitude": location.latitude,
            "longitude": location.longitude
        }
        data["zip_code"] = location.raw['display_name'].split(",")[-2]
        address = geolocator.reverse((location.latitude, location.longitude), language="en").raw["address"]
        short_address_list = []
        if address.get("suburb") or address.get("road"):
            short_address_list.append(address.get("suburb") or address.get("road"))
        if address.get("city"):
            short_address_list.append(address.get("city"))
        if address.get("state"):
            short_address_list.append(address.get("state"))
        data["short_address"] = ", ".join(short_address_list)
        serializer = self.Serializer(data=data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # theater = serializer.create(data)
        theater = theater_create(**data)
        return Response({"theater": self.Serializer(instance=theater).data}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        query_params = request.query_params
        latitude = query_params.get("latitude", "")
        longitude = query_params.get("longitude", "")
        zip_code = query_params.get("zip_code", "")
        theaters = Theater.objects.all()
        serializer = TheaterFilterSerializer(data=query_params)
        serializer.is_valid(raise_exception=True)
        filters = serializer.data
        if "technologies" in filters:
            theaters = theaters.filter(technologies__contains=filters["technologies"])
        if "food" in filters:
            theaters = theaters.filter(cuisines__contains=filters["food"])
        # if zip_code:
        #     theaters = theaters.filter(zip_code=zip_code)
        theaters = TheaterOutputSerializer(theaters, many=True).data
        for theater in theaters:
            if latitude and longitude:
                distance = geodesic((theater["location"]["latitude"],theater["location"]["longitude"]), (latitude, longitude)).miles
            elif zip_code:
                geolocator = Nominatim(user_agent=f"User agent: {random.randint(1,10000)}")
                location = geolocator.geocode(f"{zip_code}, USA")
                print(location.raw)
                coordinates = (location.latitude, location.longitude)
                distance = geodesic(coordinates, (theater["location"]["latitude"],theater["location"]["longitude"])).miles
                if distance>10:
                    continue
            else:
                distance = 0
            theater["distance"] = round(distance, 1)
        return Response({"theaters": theaters}, status=status.HTTP_200_OK)


class TheaterGetUpdateDeleteAPI(APIView):
    Serializer = TheaterSerializer
    
    def get(self, request, pk):
        try:
            theater = Theater.objects.get(id=pk)
            serializer = TheaterSerializer(theater)
            return Response(serializer.data)
        except Theater.DoesNotExist:
            return Response({'message': 'Theater not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, pk):
        geolocator = Nominatim(user_agent=f"User agent: {random.randint(1,10000)}")
        data = request.data
        location = geolocator.geocode(data["address"])
        data["location"] = {
            "latitude": location.latitude,
            "longitude": location.longitude
        }
        address = geolocator.reverse((location.latitude, location.longitude), language="en").raw["address"]
        data["zip_code"] = address.get("postcode", location.raw['display_name'].split(",")[-2])
        short_address_list = []
        if address.get("suburb") or address.get("road"):
            short_address_list.append(address.get("suburb") or address.get("road"))
        if address.get("city"):
            short_address_list.append(address.get("city"))
        if address.get("state"):
            short_address_list.append(address.get("state"))
        data["short_address"] = ", ".join(short_address_list)
        try:
            theater = Theater.objects.get(id=pk)
            serializer = TheaterUpdateSerializer(theater, data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'theater': serializer.data}, status=status.HTTP_200_OK)
        except Theater.DoesNotExist:
            return Response({'message': 'Theater not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            movie = Theater.objects.get(id=pk)
            movie.delete()
            return Response({'message': 'Theater deleted successfully'})
        except Theater.DoesNotExist:
            return Response({'message': 'Theater not found'}, status=status.HTTP_404_NOT_FOUND)