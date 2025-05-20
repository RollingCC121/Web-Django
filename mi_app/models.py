from django.db import models
from django.contrib.auth.models import User

class BandaPop(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Perfil(models.Model):
    ROLES = (
        ('admin', 'Admin'),
        ('usuario', 'Usuario'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rol = models.CharField(max_length=10, choices=ROLES, default='usuario')

    def __str__(self):
        return f"{self.user.username} ({self.rol})"
