from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from apps.users.models import User
from apps.users.serializers import UserSerializer, RegisterSerializer, LoginSerializer
from config.helper import *
from config import settings

import os
import re

def extract_information(text):
    name_pattern = re.compile(r'ANARANA\s*/\s*Nom:\s*(.*)')
    surname_pattern = re.compile(r'FANAMPIN\'ANARANA\s*/\s*Prénom:\s*(.*)')
    cin_pattern = re.compile(r'Numéro\s*de\s*CIN:\s*(\d{12})')
    dob_pattern = re.compile(r'Date\s*de\s*naissance:\s*(\d{2}/\d{2}/\d{4})')

    name_match = name_pattern.search(text)
    surname_match = surname_pattern.search(text)
    cin_match = cin_pattern.search(text)
    dob_match = dob_pattern.search(text)

    name = name_match.group(1).strip() if name_match else None
    surname = surname_match.group(1).strip() if surname_match else None
    cin = cin_match.group(1).strip() if cin_match else None
    dob = dob_match.group(1).strip() if dob_match else None

    return {
        'name': name,
        'surname': surname,
        'cin': cin,
        'date_of_birth': dob,
    }

class UserListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            serializer = UserSerializer(User.objects.all(),many=True)
            users = serializer.data
            users = [user for user in users if not user['is_superuser']]
            return Response(users, status=200)
        except User.DoesNotExist:
            return Response({'erreur':'user does not exist'},status=404)
        
class UserSearchView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, search_name=''):
        try:
            if search_name=='':
                users = UserSerializer(User.objects.all(),many=True).data
            else:
                users = UserSerializer(User.objects.filter(name__icontains=search_name),many=True).data    
            users = [user for user in users if not user['is_superuser']]
            return Response(users, status=200)
        except User.DoesNotExist:
            return Response({'erreur':'user does not exist'},status=404)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,id_user):
        try:
            serializer = UserSerializer(User.objects.get(id=id_user))
            user = serializer.data
            if not user['is_active']:
                return Response({'error': 'you should login first'}, status=403)
            if user['is_superuser']:
                return Response({'erreur':'non autorisé'},status=401)
            user.pop('is_superuser')
            return Response(user, status=200)
        except User.DoesNotExist:
            return Response({'erreur':'user does not exist'},status=404)

class LogoutView(APIView):
    permission_classes = [AllowAny]

    def put(self, request:Request):
        try:
            user = User.objects.get(id=request.user.id)
            user.is_active = False
            user.save()
            return Response({'message':'user disconnected successfully'}, status=200)
        except User.DoesNotExist:
            return Response({'error':'User does not exit'}, status=404)


class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        # request.data.keys = ['email', 'password']
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegisterView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser]

    def validate_data(self,data):
        if any(not data[attr] for attr in ['name','email','password','confirm_password','contact','genre']):
            return False
        return True

    def post(self, request):
        # request.data.keys = ['name','email','password','confirm_password','contact','genre']
        if not self.validate_data(request.data.copy()):return Response({'erreur':'Tous les attributs sont requis'},status=400)
        try:
            if request.data['password']!=request.data['confirm_password']:
                return Response({'erreur':'Les mots de passe fournies ne sont pas identiques.'},status=400)
        
            serializer = RegisterSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            user_saved = serializer.save()
            return Response(user_saved, status=201)
        except Exception as e:
            print(e)
            return Response({'erreur':str(e)},status=400)
        return Response(serializer.errors, status=400)


class GetInfoPhotoIdentityView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        if 'identity' not in request.FILES:
            return Response({'error': 'No file provided.'}, status=400)

        identity_file = request.FILES['identity']
        directory_to_save = os.path.join(settings.MEDIA_ROOT, 'users/identity')
        if not os.path.exists(directory_to_save):
            os.makedirs(directory_to_save)
        file_path = os.path.join(directory_to_save, identity_file.name)
        with open(file_path, 'wb+') as destination:
            for chunk in identity_file.chunks():
                destination.write(chunk)
        text = image_to_text(file_path)
        if "REPOBLIKAN ‘I MADAGASIKARA\n\nFitiavana - Tanindrazana - Fandrosoana\n\nKARA-PANONDROM-PIRENENA\n(Carte Nationale d'Identité)"not in text:
            return Response({'erreur':'la pièce d\'identité fourni n\'est pas un cin'},status=400)
        info = extract_information(text)
        photo_saved = face_recognition_save(file_path, directory_to_save, 'face_' + identity_file.name)
        return Response({
            'info': info,
            'photo_identity': F"{settings.BASE_URL}api/users/media/users/identity/"+ photo_saved,
            'identity':f"{settings.BASE_URL}api/users/media/users/identity/"+identity_file.name
        }, status=200)
