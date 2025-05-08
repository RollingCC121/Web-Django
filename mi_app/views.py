from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
import re
from .models import BandaPop
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator


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

        # Verificar si el usuario ya existe
        if User.objects.filter(username=username).exists():
            messages.error(request, 'El nombre de usuario ya está en uso.')
        else:
            User.objects.create_user(username=username, password=password)
            messages.success(request, 'Usuario creado exitosamente. Inicia sesión.')
            return redirect('login')

    return render(request, 'register.html')

from django.core.paginator import Paginator
import re

@login_required
def home(request):
    query = request.GET.get('q', '')
    page_number = request.GET.get('page')

    bandas = BandaPop.objects.all()

    if query:
        try:
            regex = re.compile(query, re.IGNORECASE)
            bandas = [b for b in bandas if regex.search(b.nombre)]
        except re.error:
            bandas = []
            messages.error(request, 'Expresión regular inválida')

    paginator = Paginator(bandas, 10)  # 10 bandas por página
    page_obj = paginator.get_page(page_number)

    return render(request, 'home.html', {
        'page_obj': page_obj,
        'query': query,
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


