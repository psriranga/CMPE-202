from theater.serializers import TheaterSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from theater.models import Theater
from core.mixins import ApiAuthenticationMixin
from theater.services import theater_create


class TheaterCreateAPI(APIView):
    Serializer = TheaterSerializer

    def post(self, request):
        serializer = self.Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        # theater = serializer.create(data)
        theater = theater_create(**data)
        return Response({"theater": self.Serializer(instance=theater).data}, status=status.HTTP_201_CREATED)
