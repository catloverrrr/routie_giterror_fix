from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    phonenumber = serializers.CharField(
        required=False,
        validators=[UniqueValidator(queryset=Profile.objects.all())]
    )
    birthday = serializers.DateField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'phonenumber', 'birthday')

    def validate(self, data):
        # 비밀번호 확인
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        # User 객체 생성
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        # Profile 객체 생성
        try:
            Profile.objects.create(
                user=user,
                phonenumber=validated_data.get('phonenumber', ''),
                birthday=validated_data.get('birthday')
            )
        except IntegrityError:
            user.delete()  # Profile 생성 실패 시 User 삭제
            raise serializers.ValidationError({"phonenumber": "This phone number is already registered."})

        # 토큰 생성
        Token.objects.create(user=user)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return {"token": token.key}
        raise serializers.ValidationError(
            {"error": "Unable to log in with provided credentials."}
        )


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Profile
        fields = ("username", "email", "image", "phonenumber", "birthday")
