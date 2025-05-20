from django.db import models
from django.contrib.auth.models import User

class BandaPop(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    imagen = models.ImageField(upload_to='bandas/', blank=True, null=True)


    def __str__(self):
        return self.nombre

class Comentario(models.Model):
    banda = models.ForeignKey(BandaPop, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario de {self.usuario.username} en {self.banda.nombre}"

class Perfil(models.Model):
    ROLES = (
        ('admin', 'Admin'),
        ('usuario', 'Usuario'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=50, blank=True)
    biografia = models.TextField(blank=True)
    region = models.CharField(max_length=100, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    rol = models.CharField(max_length=10, choices=ROLES, default='usuario')

    def __str__(self):
        return f"{self.user.username} ({self.rol})"
