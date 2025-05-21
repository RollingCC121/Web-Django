from django.contrib import admin
from .models import Perfil

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'rol', 'region')
    search_fields = ('user__username', 'nickname', 'rol', 'region')
