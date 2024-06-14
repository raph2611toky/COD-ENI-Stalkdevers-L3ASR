from rest_framework import serializers
from apps.services.models import *
from apps.users.serializers import UserSerializer
from config import settings

class HierarchieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hierarchie
        fields = '__all__'
        
class HierarchieAuxiliaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = HierarchieAuxiliaire
        fields = '__all__'        


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
        
class DocumentSerializer(serializers.ModelSerializer):
    document = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = ['document']
        
    def get_document(self,obj):
        return f"{settings.BASE_URL}api/services{obj.document.url}" if obj.document else None


class DemandeSerializer(serializers.ModelSerializer):
    service = ServiceSerializer()
    utilisateur = UserSerializer()
    documents_soumis = DocumentSerializer(many=True)

    class Meta:
        model = Demande
        fields = ['id_demande', 'utilisateur', 'service', 'etat', 'documents_soumis', 'date_demande']