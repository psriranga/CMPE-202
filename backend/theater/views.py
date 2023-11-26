from theater.serializers import TheaterSerializer, TheaterOutputSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from theater.models import Theater
from core.mixins import ApiAuthenticationMixin
from core.errors import MissingResource
from theater.services import theater_create
from geopy.geocoders import Nominatim
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
        serializer = self.Serializer(data=data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # theater = serializer.create(data)
        theater = theater_create(**data)
        return Response({"theater": self.Serializer(instance=theater).data}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        theaters = Theater.objects.filter()
        return Response({"theaters": TheaterOutputSerializer(theaters, many=True).data}, status=status.HTTP_200_OK)


class TheaterGetAPI(APIView):
    Serializer = TheaterSerializer
    def get_object_or_not_found(self, request, pk):
        theatre = Theater.objects.get(id=pk)
        if not theatre:
            raise MissingResource(f'No such Theater: {pk}')
        return Theater

    def get(self, request, pk):
        theater = self.get_object_or_not_found(request, pk)
        print(theater.location)
        Response({"theater": TheaterOutputSerializer(instance=theater).data}, status=status.HTTP_200_OK)