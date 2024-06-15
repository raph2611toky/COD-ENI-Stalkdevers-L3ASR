from django.urls import path
from apps.services.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('hierarchies/', HierarchieView.as_view(), name='hierarchies'),#get_all,post
    path('hierarchie/<int:id_hierarchie>/', HierarchieView.as_view(), name='hierarchie'),#get_one,put,delete
    path('hierarchies/aux/', HierarchieAuxiliaireView.as_view(), name='hierarchies_aux'),#get_all,post
    path('hierarchie/aux/<int:id_hierarchie>/', HierarchieAuxiliaireView.as_view(), name='hierarchie_aux'),#get_one,put,delete
    path('services/', ServiceView.as_view(), name='services'),#get_all
    path('service/<int:id_service>/', ServiceView.as_view(), name='service'),#get_one,put,delete
    path('service/<int:id_hierarchie>/', ServiceView.as_view(), name='services_hierarchie'),#get
    path('demande/<int:id_demande>/', DemandeView.as_view(), name='demandes'),#get,post
    path('demande/<int:id_service>/', DemandeView.as_view(), name='demande_service'),#get
    path('demande/<int:id_user>/', DemandeView.as_view(), name='demande_user'),#get
    path('demande/historique/<int:id_user>/', HistoriqueDemandeView.as_view(), name='demande_historique_user'),#get
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
