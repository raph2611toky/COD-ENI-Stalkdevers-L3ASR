from django.urls import path
from config import settings
from django.conf.urls.static import static

from apps.users.views import *

app_name = 'users'

urlpatterns = [
    path('', UserListView.as_view(), name='profile'),#get_all
    path('search/<str:search_name>/', UserSearchView.as_view(), name='profile'),#get_all
    path('profile/<int:id_user>/', ProfileView.as_view(), name='profile'),#get_one
    path('register/info_cin/', GetInfoPhotoIdentityView.as_view(), name='get_info_cin'),#post
    path('logout/', LogoutView.as_view(), name='logout'),#put
    path('login/', LoginView.as_view(), name='login'),#post
    path('register/', RegisterView.as_view(), name='register'),#post
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
