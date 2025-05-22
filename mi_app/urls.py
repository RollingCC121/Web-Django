from django.urls import path
from . import views
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static

def trigger_error(request):
    division_by_zero = 1 / 0


urlpatterns = [
    path('', lambda request: redirect('lobby')),
    path('lobby/', views.lobby_view, name='lobby'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('home/', views.home, name='home'),
    path('register/', views.register_view, name='register'),
    path('crear/', views.crear_banda, name='crear_banda'),
    path('editar/<int:banda_id>/', views.editar_banda, name='editar_banda'),
    path('eliminar/<int:banda_id>/', views.eliminar_banda, name='eliminar_banda'),
    path('perfil/', views.perfil_usuario, name='perfil_usuario'),
    path('contacto/', views.contacto, name='contacto'),
    path('comentario/editar/<int:comentario_id>/', views.editar_comentario, name='editar_comentario'),
    path('comentario/eliminar_ajax/<int:comentario_id>/', views.eliminar_comentario_ajax, name='eliminar_comentario_ajax'),
    path('comentario/editar_ajax/<int:comentario_id>/', views.editar_comentario_ajax, name='editar_comentario_ajax'),
    path('banda/editar_nombre/<int:banda_id>/', views.editar_banda_nombre, name='editar_banda_nombre'),
    path('banda/editar_desc/<int:banda_id>/', views.editar_banda_desc, name='editar_banda_desc'),
    path('sentry-debug/', trigger_error),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)