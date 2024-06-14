from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import PasswordField

from apps.users.models import User
from config import settings

class UserSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'contact','photo', 'is_active', 'last_login', 'date_joined','role','is_superuser']

    def get_photo(self, obj):
        return f"{settings.BASE_URL}api/users{obj.photo.url}" if obj.photo else None
    
    def get_name(self, obj):
        name = obj.first_name.capitalize()
        if obj.last_name:name+=' '+obj.last_name
        return 


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = PasswordField()
    
    def validate(self, attrs):
        user = authenticate(**attrs)
        if not user:
            raise AuthenticationFailed()
        user_logged = User.objects.get(id=user.id)
        user_logged.is_active = True
        update_last_login(None, user_logged)
        user_logged.save()
        data = {}
        refresh = self.get_token(user_logged)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['name'] = user_logged.first_name+' '+user_logged.last_name
        return data
    
    def get_token(self, user):
        return RefreshToken.for_user(user)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['email', 'password', 'name', 'contact', 'photo']

    def create(self, validated_data):
        print('validated_data')
        validated_data['genre'] = self.context.get('request').data['genre']
        photo = self.context.get('request').FILES.get('photo') 
        if photo:
            validated_data['photo'] = photo
            user = User.objects.create(**validated_data)
        else:
            user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.is_active = True
        update_last_login(None, user)
        user.save()
        user_created = User.objects.get(id=user.id)
        user_data = UserSerializer(user_created).data
        data = user_data
        return data
