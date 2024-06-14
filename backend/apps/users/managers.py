from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
from datetime import timedelta

class UserManager(BaseUserManager):
    
    def _create_user(self, first_name, password, is_staff, is_superuser, **extra_fields):
        if not first_name:
            raise ValueError('User must have an first_name address')
        now = timezone.localtime(timezone.now()) + timedelta(hours=3)
        user = self.model(
            first_name=first_name.capitalize(),
            is_staff=is_staff,
            is_superuser=is_superuser, 
            is_active=True,
            last_login=now,
            date_joined=now, 
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_user(self, first_name, password, **extra_fields):
        return self._create_user(first_name, password, False, False, **extra_fields)
    
    def create_staffuser(self, first_name,password,**extra_fields):
        return self._create_user(first_name, password, True, False, **extra_fields)

    def create_superuser(self, first_name, password, **extra_fields):
        return self._create_user(first_name, password, True, True, **extra_fields)