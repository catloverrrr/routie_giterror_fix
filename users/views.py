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
            {
                "message": "이 API는 회원가입 기능을 제공합니다. 회원가입을 하려면 username, password, email 등을 포함하여 POST 요청을 보내세요."
            },
            status=status.HTTP_200_OK,  # 405 대신 200으로 정상 응답
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
            {
                "message": "이 API는 로그인 기능을 제공합니다. 로그인을 하려면 username과 password를 포함하여 POST 요청을 보내세요."
            },
            status=status.HTTP_200_OK,  # 405가 아니라 200을 반환하여 정상 응답 처리
        )

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data  # Ensure token is a Token object

        return Response(
            token,
            status=status.HTTP_200_OK,
        )


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Profile.objects.none()  # 인증되지 않은 사용자일 경우 빈 QuerySet 반환
        return Profile.objects.filter(user=self.request.user)
