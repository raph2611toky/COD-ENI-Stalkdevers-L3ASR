from django.contrib import admin
from apps.users.models import User
from django.contrib.auth.hashers import make_password
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.utils.html import format_html
from config import settings

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name','last_name', 'email','genre', 'photo', 'contact','occupation','role', 'profile_image']
    list_per_page = 5
    search_fields = ('first_name', 'email')
    list_filter = ['is_staff','is_active']
    actions = ['modifier_utilisateurs']

    def save_model(self, request, obj, form, change):
        obj.password = make_password(obj.password)
        obj.nom = obj.nom.capitalize()
        return super().save_model(request, obj, form, change)


    def modifier_utilisateurs(self, request, queryset):
        if queryset.count() == 1:
            utilisateur = queryset.first()
            url = reverse('admin:users_user_change', args=[utilisateur.id])
            return HttpResponseRedirect(url)
        else:
            self.message_user(request, "Sélectionnez exactement un utilisateur.", level='ERROR')

    def profile_image(self, obj):
        if obj.photo:
            return format_html('<img src="http://{}:8000/api/users{}" style="width:30px;height:30px;border-radius:50%;" />', settings.IP_ADDR, obj.photo.url)
        return 'No Image'

    readonly_fields = ('profile_image_preview',)

    def profile_image_preview(self, obj):
        if obj.photo:
            return format_html('<img src="http://{}:8000/api/users{}" style="width:30px;height:30px;border-radius:50%;" />', settings.IP_ADDR, obj.photo.url)
        return 'No Image'

    profile_image.allow_tags = True
    profile_image.short_description = 'Profile Image'

admin.site.register(User,UserAdmin)