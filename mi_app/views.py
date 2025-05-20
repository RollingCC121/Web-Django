from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
import re
from .models import BandaPop, Perfil, Comentario
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator


def lobby_view(request):
    return render(request, 'lobby.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        nickname = request.POST.get('nickname', '')
        biografia = request.POST.get('biografia', '')
        region = request.POST.get('region', '')
        fecha_nacimiento = request.POST.get('fecha_nacimiento', None)

        if User.objects.filter(username=username).exists():
            messages.error(request, 'El nombre de usuario ya está en uso.')
        else:
            user = User.objects.create_user(username=username, password=password)
            perfil = Perfil.objects.create(
                user=user,
                nickname=nickname,
                biografia=biografia,
                region=region,
                fecha_nacimiento=fecha_nacimiento,
                rol='usuario'  # Siempre usuario al registrarse
            )
            messages.success(request, 'Usuario creado exitosamente. Inicia sesión.')
            return redirect('login')

    return render(request, 'register.html')

from django.core.paginator import Paginator
import re

@login_required
def home(request):
    query = request.GET.get('q', '')
    page_number = request.GET.get('page')
    banda_id = request.GET.get('banda_id')

    bandas = BandaPop.objects.all()
    banda_detalle = None
    comentarios = []

    if query:
        try:
            regex = re.compile(query, re.IGNORECASE)
            bandas = [b for b in bandas if regex.search(b.nombre)]
        except re.error:
            bandas = []

    paginator = Paginator(bandas, 10)
    page_obj = paginator.get_page(page_number)

    if banda_id:
        try:
            banda_detalle = BandaPop.objects.get(id=banda_id)
            # Guardar comentario si es POST
            if request.method == 'POST':
                texto = request.POST.get('comentario')
                if texto:
                    Comentario.objects.create(
                        banda=banda_detalle,
                        usuario=request.user,
                        texto=texto
                    )
            # Obtener comentarios actualizados
            comentarios = banda_detalle.comentarios.select_related('usuario').order_by('-fecha')
        except BandaPop.DoesNotExist:
            banda_detalle = None

    rol = None
    if hasattr(request.user, 'perfil'):
        rol = request.user.perfil.rol

    return render(request, 'home.html', {
        'page_obj': page_obj,
        'query': query,
        'banda_detalle': banda_detalle,
        'comentarios': comentarios,
        'rol': rol,
    })


@login_required
def crear_banda(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        if nombre:
            BandaPop.objects.create(nombre=nombre)
            return redirect('home')
    return render(request, 'crear_banda.html')

@login_required
def editar_banda(request, banda_id):
    banda = get_object_or_404(BandaPop, id=banda_id)
    if request.method == 'POST':
        nuevo_nombre = request.POST.get('nombre')
        if nuevo_nombre:
            banda.nombre = nuevo_nombre
            banda.save()
            return redirect('home')
    return render(request, 'editar_banda.html', {'banda': banda})

@login_required
def eliminar_banda(request, banda_id):
    banda = get_object_or_404(BandaPop, id=banda_id)
    if request.method == 'POST':
        banda.delete()
        return redirect('home')
    return render(request, 'eliminar_banda.html', {'banda': banda})

@login_required
def detalle_banda(request, banda_id):
    banda = get_object_or_404(BandaPop, id=banda_id)
    return render(request, 'detalle_banda.html', {'banda': banda})

@login_required
def perfil_usuario(request):
    perfil = request.user.perfil
    if request.method == 'POST':
        perfil.nickname = request.POST.get('nickname', perfil.nickname)
        perfil.region = request.POST.get('region', perfil.region)
        perfil.biografia = request.POST.get('biografia', perfil.biografia)
        perfil.save()
        return redirect('perfil_usuario')
    return render(request, 'perfil_usuario.html', {'perfil': perfil})
