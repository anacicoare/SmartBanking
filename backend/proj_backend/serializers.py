from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from proj_backend.models import UserData


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # # Ensure the field is explicitly declared for receiving input
    # email = serializers.EmailField()

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        # token['username'] = user.username
        # ...
    #
    def validate(self, attrs):
        # Override the credentials handling to use 'email' instead of 'username'
        attrs['email'] = attrs.get('email')
        return super().validate(attrs)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = UserData
        fields = ["id", "email", "name", "password"]

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
