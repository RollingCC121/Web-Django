# Documentación Técnica

## Estructura General

- **Backend:** Django (Python)
- **Frontend:** HTML5, Bootstrap 5, JavaScript (AJAX)
- **Monitoreo:** Sentry (backend), LogRocket (frontend)
- **Base de datos:** SQLite (desarrollo)
- **Autenticación:** Django auth, roles personalizados

---

## Principales Archivos y Carpetas

- `mi_proyecto/settings.py`: Configuración global, Sentry, rutas estáticas/media.
- `mi_app/models.py`: Modelos de Bandas, Comentarios, Perfil de usuario.
- `mi_app/views.py`: Lógica de vistas, AJAX, control de roles.
- `mi_app/templates/`: HTML principal (`home.html`), fragmentos (`partials/`).
- `mi_app/static/js/home.js`: Lógica JS para UX, AJAX, banners, edición en vivo.
- `requirements.txt`: Dependencias del proyecto.

---

## Integraciones

- **Sentry:**  
  Configurado en `settings.py` con `send_default_pii=True` para asociar errores a usuarios.
- **LogRocket:**  
  Script cargado en los templates, identificación de usuario y rol mediante variables globales JS.

---

## Funcionalidades Técnicas

- **Paginación AJAX:**  
  Dropdown de bandas con paginación dinámica usando una vista AJAX y un template parcial.
- **Edición y eliminación en vivo:**  
  Comentarios y bandas pueden ser editados/eliminados sin recargar la página, usando fetch y endpoints AJAX.
- **Rotación de banners:**  
  Banners laterales cambian automáticamente usando arrays de imágenes y animaciones de opacidad en JS.
- **Roles y permisos:**  
  Solo usuarios con rol `admin` pueden ver y usar botones de edición/eliminación de bandas.
- **Monitoreo:**  
  Errores y sesiones se reportan automáticamente a Sentry.

---

# Análisis de Retos y Soluciones Implementadas

## 1. **Paginación AJAX en el Dropdown**

**Reto:**  
Permitir que la lista de bandas en el buscador se pagine sin recargar la página.

**Solución:**  
- Se creó una vista AJAX (`bandas_dropdown_ajax`) que retorna un fragmento HTML.
- Se implementó delegación de eventos en JS para interceptar los clics de paginación y actualizar el dropdown dinámicamente.

---

## 2. **Edición y Eliminación de Comentarios sin Recarga**

**Reto:**  
Permitir a los usuarios editar y eliminar comentarios de forma fluida.

**Solución:**  
- Se usaron formularios ocultos y botones que, al activarse, muestran el formulario de edición en línea.
- Las acciones se envían por fetch a endpoints AJAX, que responden con JSON y actualizan el DOM sin recargar.

---

## 3. **Gestión de Roles y Permisos**

**Reto:**  
Restringir ciertas acciones (agregar, editar, eliminar bandas) solo a administradores.

**Solución:**  
- Se añadió un campo `rol` en el perfil de usuario.
- Los templates usan `{% if rol == 'admin' %}` para mostrar u ocultar botones.
- Las vistas AJAX y normales verifican el rol antes de realizar cambios.

---

## 4. **Rotación de Banners Laterales**

**Reto:**  
Mostrar banners laterales animados y rotativos para mejorar la estética.

**Solución:**  
- Arrays de rutas de imágenes en JS.
- Uso de `setInterval` y animación de opacidad para transiciones suaves.

---

## 5. **Monitoreo de Errores y Sesiones**

**Reto:**  
Detectar y rastrear errores tanto en frontend como en backend, asociando cada evento a un usuario.

**Solución:**  
- **Sentry:** Configurado con `send_default_pii=True` y (opcionalmente) middleware para incluir el rol.
- **LogRocket:** Script en los templates, pasando variables globales JS para identificar usuario y rol.

---

## 6. **Comunicación de Variables Django a JavaScript**

**Reto:**  
Pasar datos de usuario y rol desde Django a JS externo (home.js).

**Solución:**  
- Definir variables globales en el template HTML antes de cargar el JS.
- El JS lee estas variables y las usa para identificación en LogRocket y otras funciones.

---

## 7. **Manejo de Errores AJAX**

**Reto:**  
Mostrar mensajes claros al usuario cuando una acción AJAX falla.

**Solución:**  
- Las respuestas AJAX incluyen claves `success` y `error`.
- El JS muestra alertas o mensajes según el resultado.

---

## 8. **Pruebas de Monitoreo**

**Reto:**  
Verificar que Sentry capture errores y sesiones correctamente.

**Solución:**  
- Se agregaron errores intencionales (`1/0` en vistas) y se verificó su aparición en los dashboards de monitoreo.

---

**¿Dudas o sugerencias? Consulta el código fuente o abre un issue en el repositorio.**