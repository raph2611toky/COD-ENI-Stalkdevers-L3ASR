from django.db import models
from django.utils import timezone

from apps.users.models import User

def default_created_at():
    return timezone.now()

class Hierarchie(models.Model):
    id_hierarchie = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nom} - {self.adresse if self.adresse else self.arrondissement}"
    
    class Meta:
        db_table = 'hierarchie'

class HierarchieAuxiliaire(models.Model):
    id_hierarchie = models.AutoField(primary_key=True)
    hierarchie = models.ForeignKey(Hierarchie, related_name='hierarchie_domaine', on_delete=models.CASCADE)
    user = models.ForeignKey(User,related_name='user_hierarchie',on_delete=models.CASCADE)
    code_postal = models.CharField(max_length=10, blank=True, null=True)
    adresse = models.CharField(max_length=255, blank=True, null=True)
    arrondissement = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.nom} - {self.adresse if self.adresse else self.arrondissement}"
    
    class Meta:
        db_table = 'hierarchieauxiliaire'


class Service(models.Model):
    id_service = models.AutoField(primary_key=True)
    hierarchie = models.ForeignKey(Hierarchie, on_delete=models.CASCADE, related_name='services')
    nom_service = models.CharField(max_length=100)
    description = models.TextField()
    prix = models.DecimalField(max_digits=50, decimal_places=2)
    currency = models.CharField(max_length=20,default='Ariary')
    documents_requis = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom_service
    
    class Meta:
        db_table = 'service'
        
class Document(models.Model):
    id_document = models.AutoField(primary_key=True)
    document = models.FileField(upload_to='documents/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return 
    class Meta:
        db_table = 'document'
    
class Demande(models.Model):
    ETAT_CHOICES = [
        ('en_attente', 'En attente'),
        ('en_cours', 'En cours'),
        ('complete', 'Complétée'),
        ('rejete', 'Rejetée'),
    ]
    id_demande = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='demandes')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='demandes')
    etat = models.CharField(max_length=20, choices=ETAT_CHOICES, default='en_attente')
    documents_soumis = models.ManyToManyField(Document,related_name='documents')
    date_demande = models.DateTimeField(default=timezone.now)
    last_modification = models.DateTimeField(default=default_created_at)

    def __str__(self):
        return f"{self.user.first_name} - {self.service.nom_service} ({self.get_etat_display()})"
    
    def change_etat_en_attente(self):
        self.etat = 'en_attente'
        self.last_modification = default_created_at()
    
    def change_etat_en_cours(self):
        self.etat = 'en_cours'
        self.last_modification = default_created_at()
        
    def change_etat_en_complete(self):
        self.etat = 'complet'
        self.last_modification = default_created_at()
        
    def change_etat_en_rejete(self):
        self.etat = 'rejete'
        self.last_modification = default_created_at()
    
    class Meta:
        db_table = 'demande'
        
        