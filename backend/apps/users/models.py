from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.mail import send_mail
from django.conf import settings

from apps.users.managers import UserManager
from config.helper import random_int

def default_created_at():
    return timezone.now()

def choose_man_profil():
    number_choice = str(random_int(1, 5))
    return f'defaults/users/photo/man{number_choice}.jpg'

def choose_woman_profil():
    number_choice = str(random_int(1, 5))
    return f'defaults/users/photo/woman{number_choice}.jpg'

class User(AbstractUser):
    ROLE_CHOICES = [
        ('client_simple', 'Client Simple'),
        ('client_staff', 'Client Staff'),
        ('super_user', 'Super User'),
    ]

    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100,null=True)
    email = models.EmailField('email', unique=True)
    photo = models.ImageField(upload_to='users/photo', default=choose_man_profil)
    genre = models.CharField(max_length=20, default='inconnu')
    contact = models.CharField(max_length=20, null=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='client_simple')
    occupation = models.CharField(max_length=100)
    status_etat_civile = models.CharField(max_length=100)
    is_validated = models.BooleanField(default=False)
    
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.first_name.capitalize()

    def save(self, *args, **kwargs):
        if 'defaults/users/photo/man' in self.photo.name and self.genre.lower() == 'feminin':
            self.photo.name = choose_woman_profil()

        if self.role == 'client_staff' and not self.is_validated:
            self.is_active = False
        super().save(*args, **kwargs)

    def activate_user(self):
        self.is_active = True
        self.is_validated = True
        self.save()

    class Meta:
        db_table = 'user'
