from django.urls import path
from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('login')),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('home/', views.home, name='home'),
    path('register/', views.register_view, name='register'),
    path('crear/', views.crear_banda, name='crear_banda'),
    path('editar/<int:banda_id>/', views.editar_banda, name='editar_banda'),
    path('eliminar/<int:banda_id>/', views.eliminar_banda, name='eliminar_banda')
]