# cargarimagenes.py
import os
import django

# Configura el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mi_proyecto.settings')  # Cambia 'mi_proyecto' por el nombre de tu proyecto
django.setup()

from mi_app.models import BandaPop

# Nombre de la única imagen que cargaste en media/bandas
nombre_imagen = "banda1.jpg"  # Cambia esto por el nombre real de tu imagen
ruta_imagen_rel = os.path.join('bandas', nombre_imagen)
ruta_imagen_abs = os.path.join('media', 'bandas', nombre_imagen)

if not os.path.exists(ruta_imagen_abs):
    print(f"No se encontró la imagen: {ruta_imagen_abs}")
else:
    bandas = BandaPop.objects.all()
    for banda in bandas:
        banda.imagen = ruta_imagen_rel  # Asigna la misma imagen a todas las bandas
        banda.save()
        print(f"Imagen asignada a {banda.nombre}: {ruta_imagen_rel}")

    print("¡Imagen asignada a todas las bandas!")