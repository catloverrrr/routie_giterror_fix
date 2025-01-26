from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import RegisterSerializer, LoginSerializer, ProfileSerializer
from .models import Profile

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    def get(self, request, *args, **kwargs):
        return Response(
            {"message": "GET method is not supported for registration."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            profile = Profile.objects.get(user=user)

            return Response(
                {
                    "message": "User registered successfully.",
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "phonenumber": profile.phonenumber,
                        "birthday": profile.birthday,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except IntegrityError as e:
            # Handle unique constraint failures
            if "users_profile.phonenumber" in str(e):
                return Response(
                    {"error": "The phone number is already registered."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            raise e


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response(
            {"message": "Send POST request with username and password to log in."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data  # Ensure token is a Token object

        return Response(
            #{"token": token.key},
            token,
            status=status.HTTP_200_OK,
        )


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # 요청한 사용자에 대한 프로필만 반환
        return Profile.objects.filter(user=self.request.user)
