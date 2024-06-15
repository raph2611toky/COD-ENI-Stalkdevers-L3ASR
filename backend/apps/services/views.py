from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny

from apps.users.serializers import UserSerializer
from apps.services.serializers import *
from apps.services.models import *
from apps.users.models import User

from django.db.models import Count
from datetime import datetime,timezone


def getHierarchieById(id_hierarchie, detail=True,get_messages=True):
    try:
        hierarchieObj = Hierarchie.objects.get(id_service=id_hierarchie)
        hierarchiSer = ServiceSerializer(hierarchieObj, context={'detail': detail}).data
        return hierarchiSer
    except Hierarchie.DoesNotExist:
        return None
    
def getServiceById(id_service, detail=True,get_messages=True):
    try:
        serviceObj = Service.objects.get(id_service=id_service)
        serviceSer = ServiceSerializer(serviceObj, context={'detail': detail}).data
        return serviceSer
    except Service.DoesNotExist:
        return None
    
class HierarchieView(
    APIView,
    ):
    def get(self,request, id_hierarchie=None):
        try:
            if id_hierarchie:
                hierarchie = getHierarchieById(id_hierarchie)
                if not hierarchie:
                    return Response({"erreur": f"Hierarchie avec id {id_hierarchie} est inexistant"},status=404)
                return Response(hierarchie,status=200)
            else:
                hierarchies = HierarchieSerializer(Hierarchie.objects.all(),many=True).data
                return Response(hierarchies,status=405)
        except Hierarchie.DoesNotExist:
            return Response({'erreur':'hierarchie non existant'},status=404)
        except Exception as e:
            return Response({'erreur':str(e)},status=400)

    def post(self,request):
        #request.data.keys() = ['nom']
        hierarchieSer = HierarchieSerializer(data=request.data)
        try:
            hierarchieSer.is_valid(raise_exception=True)
            hierarchieSer.save()
            return Response({"Message":"L'hierarchie a été crée avec succès."}, status=201)
        except Exception as e:
            return Response({"Erreur":str(e)},status=400)
    
    def put(self, request, id_hierarchie):
        try:
            hierarchieObj = Hierarchie.objects.get(id_hierarchie=id_hierarchie)
            hierarchieSer = HierarchieSerializer(hierarchieObj,data=request.data)
            hierarchieSer.is_valid(raise_exception=True)
            hierarchieSer.save()
            return Response({"message":"hierarchie a été modifié avec succès"},status=201)
        except Hierarchie.DoesNotExist:
            return Response({"erreur": f"Hierarchie avec id {id_hierarchie} est inexistant"},status=404)
        except Exception as e:
            return Response({'erreur':str(e)},status=400)

    def delete(self, request, id_hierarchie):
        try:
            hierarchieObj = Hierarchie.objects.get(id_hierarchie=id_hierarchie)
            hierarchieObj.delete()
            return Response({"message":"hierarchie a été supprimé avec succès"},status=201)
        except Hierarchie.DoesNotExist:
            return Response({"erreur": f"Hierarchie avec id {id_hierarchie} est inexistant"},status=404)


class HierarchieAuxiliaireView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, id_hierarchie=None):
        try:
            if id_hierarchie:
                hierarchie = HierarchieAuxiliaire.objects.get(id_hierarchie=id_hierarchie)
                hierarchie_data = HierarchieAuxiliaireSerializer(hierarchie).data
                return Response(hierarchie_data, status=200)
            else:
                hierarchies = HierarchieAuxiliaireSerializer(HierarchieAuxiliaire.objects.all(), many=True).data
                return Response(hierarchies, status=200)
        except HierarchieAuxiliaire.DoesNotExist:
            return Response({"erreur": f"Hierarchie avec id {id_hierarchie} est inexistant"}, status=404)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

    def post(self, request):
        # request.data.keys() = ['hierarchie', 'user', 'code_postal', 'adresse', 'arrondissement']
        hierarchie_ser = HierarchieAuxiliaireSerializer(data=request.data)
        try:
            hierarchie_ser.is_valid(raise_exception=True)
            hierarchie_ser.save()
            return Response({"Message": "L'hierarchie auxiliaire a été créée avec succès."}, status=201)
        except Exception as e:
            return Response({"Erreur": str(e)}, status=400)

    def put(self, request, id_hierarchie):
        try:
            hierarchie_obj = HierarchieAuxiliaire.objects.get(id_hierarchie=id_hierarchie)
            hierarchie_ser = HierarchieAuxiliaireSerializer(hierarchie_obj, data=request.data)
            hierarchie_ser.is_valid(raise_exception=True)
            hierarchie_ser.save()
            return Response({"message": "L'hierarchie auxiliaire a été modifiée avec succès"}, status=200)
        except HierarchieAuxiliaire.DoesNotExist:
            return Response({"erreur": f"Hierarchie auxiliaire avec id {id_hierarchie} est inexistant"}, status=404)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

    def delete(self, request, id_hierarchie):
        try:
            hierarchie_obj = HierarchieAuxiliaire.objects.get(id_hierarchie=id_hierarchie)
            hierarchie_obj.delete()
            return Response({"message": "L'hierarchie auxiliaire a été supprimée avec succès"}, status=200)
        except HierarchieAuxiliaire.DoesNotExist:
            return Response({"erreur": f"Hierarchie auxiliaire avec id {id_hierarchie} est inexistant"}, status=404)

class ServiceView(
    APIView,
    ):
    def get(self,request,id_service=None, id_hierarchie=None):
        try:
            if id_service:
                serviceSer = getServiceById(id_service)
                if not serviceSer:
                    return Response({"erreur": f"service avec id {id_service} est inexistant"},status=404)
                return Response(serviceSer,status=200)
            elif id_hierarchie:
                hierarchie = getHierarchieById(id_hierarchie)
                if not hierarchie:
                    return Response({"erreur": f"Hierarchie avec id {id_service} est inexistant"},status=404)
                hierarchie['services'] = ServiceSerializer(Service.objects.filter(hierarchie=id_hierarchie),many=True).data
                return Response(hierarchie,status=200)
            return Response({'erreur','non autorisé requete'},status=405)
        except Service.DoesNotExist:
            return Response({'erreur':'service non existant'},status=404)
        except Exception as e:
            return Response({'erreur':str(e)},status=400)

    def post(self,request):
        #request.data.keys() = ['hierarchie', 'nom_service','description','prix','currency','documents_requis']
        serviceSer = ServiceSerializer(data=request.data)
        try:
            serviceSer.is_valid(raise_exception=True)
            serviceSer.save()
            return Response({"Message":"L'service a été crée avec succès."}, status=201)
        except Exception as e:
            return Response({"Erreur":str(e)},status=400)
    
    def put(self, request, id_service):
        try:
            serviceObj = Service.objects.get(id_service=id_service)
            serviceSer = ServiceSerializer(serviceObj,data=request.data)
            serviceSer.is_valid(raise_exception=True)
            serviceSer.save()
            return Response({"message":"service a été modifié avec succès"},status=201)
        except Service.DoesNotExist:
            return Response({"erreur": f"Service avec id {id_service} est inexistant"},status=404)
        except Exception as e:
            return Response({'erreur':str(e)},status=400)

    def delete(self, request, id_service):
        try:
            serviceObj = Service.objects.get(id_service=id_service)
            serviceObj.delete()
            return Response({"message":"service a été supprimé avec succès"},status=201)
        except Service.DoesNotExist:
            return Response({"erreur": f"Service avec id {id_service} est inexistant"},status=404)

class DemandeView(APIView):
    def get(self, request, id_demande=None,id_service=None,id_user=None):
        try:
            if id_demande:
                demande = Demande.objects.get(id_demande=id_demande)
                demande_serialized = DemandeSerializer(demande).data
                return Response(demande_serialized, status=200)
            elif id_service:
                demande = DemandeSerializer(Demande.objects.filter(service=id_service),many=True).data
                return Response(demande,status=200)
            elif id_user:
                demande = DemandeSerializer(Demande.objects.filter(user=id_user),many=True).data
                return Response(demande,status=200)
            return Response({'erreur':'non autorisé'}, status=405)
        except Demande.DoesNotExist:
            return Response({"erreur": f"Demande avec id {id_demande} est inexistante"}, status=404)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

    def post(self, request):
        demande_serializer = DemandeSerializer(data=request.data)
        try:
            demande_serializer.is_valid(raise_exception=True)
            demande_serializer.save()
            return Response({"message": "La demande a été créée avec succès."}, status=201)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

    def put(self, request, id_demande):
        try:
            demande_obj = Demande.objects.get(id_demande=id_demande)
            demande_serializer = DemandeSerializer(demande_obj, data=request.data)
            demande_serializer.is_valid(raise_exception=True)
            demande_serializer.save()
            return Response({"message": "La demande a été modifiée avec succès."}, status=200)
        except Demande.DoesNotExist:
            return Response({"erreur": f"Demande avec id {id_demande} est inexistante"}, status=404)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

    def delete(self, request, id_demande):
        try:
            demande_obj = Demande.objects.get(id_demande=id_demande)
            demande_obj.delete()
            return Response({"message": "La demande a été supprimée avec succès."}, status=200)
        except Demande.DoesNotExist:
            return Response({"erreur": f"Demande avec id {id_demande} est inexistante"}, status=404)
        except Exception as e:
            return Response({"erreur": str(e)}, status=400)

class HistoriqueDemandeView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, id_user=None):
        try:
            if not id_user:
                return Response({'erreur': 'L\'id de l\'utilisateur est requis'}, status=400)
            
            date_debut = request.query_params.get('date_debut')
            date_fin = request.query_params.get('date_fin')
            etat = request.query_params.get('etat')

            demandes = Demande.objects.filter(user=id_user)

            if date_debut:
                demandes = demandes.filter(date_demande__gte=date_debut)
            if date_fin:
                demandes = demandes.filter(date_demande__lte=date_fin)
            if etat:
                demandes = demandes.filter(etat=etat)
        
            demandes_serialized = DemandeSerializer(demandes, many=True).data
            return Response(demandes_serialized, status=200)
        
        except Demande.DoesNotExist:
            return Response({'erreur': 'Aucune demande trouvée pour cet utilisateur'}, status=404)
        except Exception as e:
            return Response({'erreur': str(e)}, status=400)