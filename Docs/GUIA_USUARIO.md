# 📖 Guía de Usuario - HuellarioSoft

Guía completa para utilizar el sistema de gestión veterinaria.

---

## 🔐 Inicio de Sesión

1. Accede a la aplicación en tu navegador
2. Ingresa tus credenciales:
   - **Email**: tu correo electrónico
   - **Contraseña**: tu contraseña
3. Haz clic en "Iniciar Sesión"

### Roles del Sistema
- **Administrador**: Acceso completo a todos los módulos
- **Veterinario**: Gestión clínica (citas, historia clínica, mascotas)
- **Recepcionista**: Gestión administrativa (citas, propietarios, facturación)
- **Auxiliar**: Gestión de inventario

---

## 📊 Dashboard

Al iniciar sesión, verás el panel principal con:

### Estadísticas Rápidas
- **Citas de Hoy**: Número de citas programadas para el día actual
- **Total de Mascotas**: Mascotas registradas en el sistema
- **Total de Propietarios**: Clientes registrados
- **Facturación del Mes**: Total facturado en el mes actual

### Próximas Citas
Lista de las próximas citas programadas con:
- Hora y fecha
- Nombre de la mascota
- Nombre del propietario
- Estado de la cita

### Alertas de Stock Bajo
Productos del inventario que están por debajo del stock mínimo.

---

## 👥 Gestión de Usuarios

**Ruta**: Configuración > Usuarios

### Crear un Usuario
1. Haz clic en "Nuevo Usuario"
2. Completa el formulario:
   - Nombre completo
   - Email (debe ser único)
   - Teléfono (opcional)
   - Contraseña (mínimo 8 caracteres)
   - Confirmar contraseña
   - Rol (selecciona uno)
3. Haz clic en "Crear Usuario"

### Editar un Usuario
1. En la lista de usuarios, haz clic en "Editar"
2. Modifica los campos necesarios
3. Si quieres cambiar la contraseña, ingrésala en los campos correspondientes (si no, déjalos vacíos)
4. Haz clic en "Guardar Cambios"

### Activar/Desactivar Usuario
- Haz clic en el botón "Activo/Inactivo" en la lista
- Los usuarios inactivos no podrán iniciar sesión

### Filtros Disponibles
- **Por rol**: Administrador, Veterinario, Recepcionista, Auxiliar
- **Por estado**: Activos, Inactivos

---

## 👤 Gestión de Propietarios

**Ruta**: Gestión > Propietarios

### Crear un Propietario
1. Haz clic en "Nuevo Propietario"
2. Completa el formulario:
   - Nombre completo
   - Documento de identidad (6-10 dígitos)
   - Teléfono (formato colombiano)
   - Email
   - Dirección (opcional)
3. Haz clic en "Crear Propietario"

### Ver Detalle del Propietario
1. En la lista, haz clic en "Ver"
2. Verás:
   - Información personal completa
   - Estadísticas (número de mascotas, citas)
   - Grid con todas las mascotas del propietario
   - Botón para agregar nueva mascota

### Búsqueda
Puedes buscar propietarios por:
- Nombre completo
- Número de documento
- Teléfono

---

## 🐾 Gestión de Mascotas

**Ruta**: Gestión > Mascotas

### Crear una Mascota
1. Haz clic en "Nueva Mascota"
2. Completa el formulario:
   - **Propietario**: Selecciona de la lista (o ven desde el detalle de un propietario)
   - **Nombre**: Nombre de la mascota
   - **Especie**: 🐕 Canino, 🐈 Felino, 🦜 Ave, 🐹 Roedor, 🦎 Reptil, 🐾 Otro
   - **Raza**: Raza específica
   - **Edad**: Valor + unidad (días/meses/años)
   - **Sexo**: Macho/Hembra
   - **Color**: Color del pelaje
   - **Peso**: En kilogramos
   - **Esterilizado**: Sí/No (checkbox)
3. Haz clic en "Registrar Mascota"

### Ver Detalle de la Mascota
1. En la lista, haz clic en "Ver"
2. Verás:
   - Información completa de la mascota
   - Datos del propietario
   - Acciones rápidas:
     - Agendar nueva cita
     - Crear historia clínica
   - Estadísticas
   - Historial médico (cuando tenga)

### Filtros
- Filtra por especie usando los botones con emojis

---

## 📅 Gestión de Citas

**Ruta**: Gestión > Citas

### Crear una Cita
1. Haz clic en "Nueva Cita"
2. Completa el formulario:
   - **Mascota**: Selecciona la mascota (se muestra con especie y propietario)
   - **Veterinario**: Selecciona el veterinario
   - **Fecha**: Fecha de la cita (no puede ser anterior a hoy)
   - **Hora**: Hora de la cita (formato 24h)
   - **Motivo**: Razón de la consulta
   - **Observaciones**: Notas adicionales (opcional)
3. Haz clic en "Crear Cita"

### Estados de una Cita
- **Programada**: Cita creada, pendiente de confirmación
- **Confirmada**: Propietario confirmó asistencia
- **En Curso**: Cita en proceso
- **Completada**: Cita finalizada
- **Cancelada**: Cita cancelada (con motivo)
- **No Asistió**: Propietario no se presentó

### Cambiar Estado de una Cita
1. En la lista, haz clic en el botón del estado actual
2. Selecciona el nuevo estado
3. Confirma el cambio

### Cancelar una Cita
1. Haz clic en "Cancelar"
2. Escribe el motivo de cancelación
3. Confirma la cancelación

### Filtros
- **Por estado**: Todos, Programada, Confirmada, etc.
- **Por fecha**: Selecciona una fecha específica

---

## 📋 Historia Clínica

**Ruta**: Gestión > Historia Clínica

### Crear una Historia Clínica
1. Haz clic en "Nueva Consulta"
2. Completa las 3 secciones:

#### Sección 1: Información de la Consulta
- **Mascota**: Selecciona la mascota
- **Veterinario**: Selecciona el veterinario
- **Fecha de Consulta**: Fecha de la consulta

#### Sección 2: Signos Vitales
- **Peso** (kg): Peso actual de la mascota
- **Temperatura** (°C): Temperatura corporal (30-45°C)
- **Frecuencia Cardíaca** (lpm): Latidos por minuto
- **Frecuencia Respiratoria** (rpm): Respiraciones por minuto

#### Sección 3: Información Clínica
- **Motivo de Consulta**: Razón de la visita
- **Anamnesis**: Historia del paciente y evolución
- **Diagnóstico**: Diagnóstico médico
- **Tratamiento**: Tratamiento indicado, medicamentos, dosis
- **Observaciones**: Notas adicionales

3. Haz clic en "Guardar Historia Clínica"

### Ver Detalle de Historia Clínica
1. En la lista, haz clic en "Ver"
2. Verás toda la información organizada:
   - Información del paciente y propietario
   - Signos vitales en cards coloridas
   - Información clínica completa
   - Vacunas aplicadas (si existen)
   - Datos del veterinario

### Búsqueda
Busca por:
- Nombre de la mascota
- Nombre del propietario
- Diagnóstico

---

## 📦 Gestión de Inventario

**Ruta**: Gestión > Inventario

### Agregar un Producto
1. Haz clic en "Nuevo Producto"
2. Completa el formulario:

#### Información del Producto
- **Nombre**: Nombre del producto
- **Descripción**: Descripción detallada (opcional)
- **Categoría**: 
  - 💊 Medicamento
  - 🍖 Alimento
  - 🎾 Accesorio
  - 🩺 Insumo Médico
  - 📦 Otro
- **Unidad de Medida**: unidad, kg, litro, caja, etc.

#### Stock y Precio
- **Cantidad Inicial**: Cantidad actual en stock
- **Stock Mínimo**: Nivel mínimo antes de alerta
- **Precio (COP)**: Precio del producto

3. Haz clic en "Agregar Producto"

### Ver Productos con Stock Bajo
- Haz clic en el botón "Stock Bajo" en la parte superior
- Te mostrará todos los productos por debajo del stock mínimo

### Filtros
- **Por categoría**: Filtra por tipo de producto
- **Stock Bajo**: Ver solo productos con stock crítico

---

## 💰 Gestión de Facturación

**Ruta**: Gestión > Facturación

### Crear una Factura
1. Haz clic en "Nueva Factura"
2. Selecciona el **Propietario**
3. Agrega servicios/productos:
   - Haz clic en "Agregar Ítem"
   - Para cada ítem:
     - **Descripción**: Servicio o producto
     - **Cantidad**: Cantidad vendida
     - **Precio Unitario**: Precio por unidad
   - El subtotal se calcula automáticamente
   - Puedes agregar múltiples ítems

4. Configura ajustes (opcional):
   - **Descuento (%)**: Porcentaje de descuento (0-100)
   - **Impuesto/IVA (%)**: Porcentaje de impuesto (por defecto 19)
   - **Observaciones**: Notas adicionales

5. Revisa el **Resumen**:
   - Subtotal
   - Descuento (si aplica)
   - IVA (si aplica)
   - **Total** (se calcula automáticamente)

6. Haz clic en "Crear Factura"

### Ver Detalle de Factura
1. En la lista, haz clic en "Ver"
2. Verás:
   - Número y fecha de factura
   - Estado (Pendiente, Pagada, Cancelada)
   - Información del cliente
   - Tabla detallada de ítems
   - Resumen de totales
   - Observaciones

### Marcar Factura como Pagada
1. En el detalle de una factura **Pendiente**
2. Haz clic en "Marcar como Pagada"
3. Selecciona el **Método de Pago**:
   - Efectivo
   - Tarjeta de Débito
   - Tarjeta de Crédito
   - Transferencia Bancaria
   - Otro
4. Confirma el pago

### Cancelar Factura
1. En el detalle de una factura **Pendiente**
2. Haz clic en "Cancelar Factura"
3. Escribe el **motivo de cancelación**
4. Confirma la cancelación

### Generar PDF
- En cualquier factura, haz clic en "Generar PDF"
- Se descargará el documento

### Filtros
- **Por estado**: Pendiente, Pagada, Cancelada
- Búsqueda por número o propietario

### Facturación del Mes
- En la parte superior verás una tarjeta con el total facturado en el mes actual

---

## 📈 Reportes

**Ruta**: Reportes

Módulo base implementado. Aquí podrás ver:
- Estadísticas generales
- Gráficos de facturación
- Reportes de citas
- Análisis de servicios más solicitados

*(En desarrollo: gráficas avanzadas con Recharts)*

---

## ⚙️ Perfil de Usuario

**Ruta**: Menú de usuario (esquina superior derecha) > Perfil

### Actualizar tu Perfil
1. Modifica tu información:
   - Nombre
   - Email
   - Teléfono
   - Contraseña (si deseas cambiarla)
2. Haz clic en "Guardar Cambios"

### Cerrar Sesión
- Haz clic en tu nombre en la esquina superior derecha
- Selecciona "Cerrar Sesión"

---

## 💡 Tips y Buenas Prácticas

### Navegación Rápida
- Usa los **query params** para acelerar tu trabajo:
  - Desde el detalle de un propietario, haz clic en "Nueva Mascota" para pre-seleccionar el propietario
  - Desde el detalle de una mascota, haz clic en "Nueva Cita" o "Nueva Historia Clínica" para pre-seleccionar la mascota

### Búsquedas Eficientes
- Usa la barra de búsqueda en cada módulo
- Combina búsqueda con filtros para resultados precisos

### Gestión de Stock
- Revisa diariamente la sección "Stock Bajo" en el Dashboard
- Usa el filtro "Stock Bajo" en Inventario para hacer pedidos

### Facturación
- Crea facturas inmediatamente después de prestar el servicio
- Marca como pagadas apenas recibas el pago
- Usa el campo de observaciones para notas importantes

### Citas
- Confirma las citas con anticipación
- Cambia el estado a "En Curso" cuando empiece la consulta
- Marca como "Completada" al finalizar

### Historia Clínica
- Registra todas las consultas, incluso las de control rutinario
- Llena todos los signos vitales para llevar un buen seguimiento
- Sé detallado en el diagnóstico y tratamiento

---

## 🆘 Solución de Problemas

### No puedo iniciar sesión
- Verifica que tus credenciales sean correctas
- Contacta al administrador si olvidaste tu contraseña

### No veo ciertos módulos
- Depende de tu rol en el sistema
- Contacta al administrador para cambio de permisos

### Error al guardar información
- Verifica que todos los campos requeridos estén completos
- Revisa que los formatos sean correctos (email, teléfono, etc.)
- Si persiste, contacta al soporte técnico

### La página no carga
- Verifica tu conexión a internet
- Recarga la página (F5 o Ctrl+R)
- Cierra sesión y vuelve a iniciar

---

## 📞 Soporte

Si necesitas ayuda adicional:
- Contacta al administrador del sistema
- Consulta la documentación técnica en `/Docs`
- Revisa el archivo `IMPLEMENTACION_COMPLETA.md` para detalles técnicos

---

**HuellarioSoft © 2024** - Sistema de Gestión Veterinaria
