// Esta función se ejecuta cuando se envía el formulario de login
document.getElementById('loginForm')?.addEventListener('submit', function () {
    const btn = this.querySelector('button');
    btn.innerHTML = 'Entrando...';
    btn.disabled = true;
  });
  
  // Puedes añadir más funciones aquí, por ejemplo, para animaciones o validaciones
  