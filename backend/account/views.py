from account.serializers import SignUpSerializer, LoginSerializer, UserSerializer
from account.auth import APIAccessAuthentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from account.models import Token, User
from booking.models import Ticket
from booking.serializers import TicketSerializer
from django.utils import timezone


class UserSignUpAPI(APIView):
    InputSerializer = SignUpSerializer

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Token.objects.get_or_create(user=user)
        return Response(
            {
                "success": True,
                "token": APIAccessAuthentication.generate_jwt_token(user),
                "email": user.email,
                "role": user.role,
                "username": user.username,
                "phoneNumber": str(user.phoneNumber),
                "is_admin": user.is_admin
            },
            status=status.HTTP_201_CREATED,
        )


class UserLoginAPI(APIView):
    InputSerializer = LoginSerializer

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {
                "success": True,
                "token": APIAccessAuthentication.generate_jwt_token(serializer.validated_data["user"]),
                "email": serializer.validated_data["user"].email,
                "role": serializer.validated_data["user"].role,
                "username": serializer.validated_data["user"].username,
                "user": SignUpSerializer(instance=serializer.validated_data["user"]).data,
                "phoneNumber": str(serializer.validated_data["user"].phoneNumber),
            },
            status=status.HTTP_200_OK,
        )

class UserGetUpdateAPI(APIView):
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid User ID'}, status=status.HTTP_404_NOT_FOUND)
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
        tickets = Ticket.objects.filter(user=user).filter(show__show_timing__gte=thirty_days_ago).filter(show__show_timing__lte=timezone.now())
        data = {
            "user": UserSerializer(user).data,
            "tickets": TicketSerializer(tickets, many=True).data,
        }
        return Response(data, status=status.HTTP_200_OK)
    def patch(self, request, id):
        data = request.data
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'Invalid User ID'}, status=status.HTTP_404_NOT_FOUND)
        user.membership_type = data.get("membership_type", user.membership_type)
        user.save()
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
        tickets = Ticket.objects.filter(user=user).filter(show__show_timing__gte=thirty_days_ago).filter(show__show_timing__lte=timezone.now())
        data = {
            "user": UserSerializer(user).data,
            "tickets": TicketSerializer(tickets, many=True).data,
        }
        return Response(data, status=status.HTTP_200_OK)
