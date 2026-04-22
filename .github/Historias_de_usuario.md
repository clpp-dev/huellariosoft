# Historias de Usuario (HU)

Las historias de usuario describen funcionalidades desde la perspectiva del usuario final, siguiendo el formato estándar de Agile: **Como** [rol], **Quiero** [acción], **Para** [beneficio].

---

## 1. Gestión de Usuarios

### HU01 - Registro de Usuarios del Sistema

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Administrador |
| **Quiero** | Registrar usuarios del sistema con sus datos básicos y credenciales |
| **Para** | Asignar permisos según su rol dentro de la veterinaria |

**Criterios de Aceptación:**
- El sistema permite crear usuarios con nombre, email, contraseña y rol
- Se valida que el email sea único en el sistema
- La contraseña cumple requisitos mínimos de seguridad
- Se asignan permisos automáticamente según el rol seleccionado

---

### HU02 - Inicio de Sesión Seguro

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Usuario autorizado |
| **Quiero** | Iniciar sesión con mis credenciales (email y contraseña) |
| **Para** | Acceder de forma segura al sistema |

**Criterios de Aceptación:**
- El sistema valida credenciales correctamente
- Se genera un token de autenticación al iniciar sesión
- Se muestra mensaje de error claro si las credenciales son incorrectas
- El usuario es redirigido al dashboard después del login exitoso

---

## 2. Gestión de Propietarios y Mascotas

### HU03 - Registro de Propietarios

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Registrar propietarios con sus datos de contacto |
| **Para** | Asociarlos correctamente con sus mascotas |

**Criterios de Aceptación:**
- Se capturan datos completos: nombre, teléfono, email, dirección
- Se valida formato de email y teléfono
- El sistema permite buscar propietarios existentes antes de crear duplicados
- Se confirma el registro exitoso

---

### HU04 - Registro de Mascotas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Registrar mascotas con información clínica básica |
| **Para** | Mantener actualizado su expediente veterinario |

**Criterios de Aceptación:**
- Se capturan datos: nombre, especie, raza, fecha de nacimiento, peso, propietario
- Cada mascota se asocia a un propietario existente
- Se permite registrar alergias y condiciones médicas conocidas
- Se genera un identificador único para cada mascota

---

### HU05 - Consulta Rápida de Mascotas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Veterinario |
| **Quiero** | Consultar rápidamente información de una mascota |
| **Para** | Revisar su historial antes de la atención |

**Criterios de Aceptación:**
- Se puede buscar por nombre de mascota o propietario
- Se muestra ficha completa con datos básicos y última consulta
- Se visualiza resumen de alergias y condiciones importantes
- La consulta responde en menos de 2 segundos

---

## 3. Gestión de Citas

### HU06 - Agendamiento de Citas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Agendar citas veterinarias con fecha, hora y motivo |
| **Para** | Organizar la atención diaria |

**Criterios de Aceptación:**
- Se selecciona mascota, fecha, hora y veterinario
- El sistema valida disponibilidad del veterinario
- Se evitan traslapes de horarios
- Se registra el motivo de la consulta

---

### HU07 - Reprogramación y Cancelación de Citas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Reprogramar o cancelar citas existentes |
| **Para** | Mantener actualizado el calendario de atención |

**Criterios de Aceptación:**
- Se puede cambiar fecha/hora de citas futuras
- Se puede cancelar con registro del motivo
- Se actualiza el estado de la cita en el calendario
- Los cambios se reflejan inmediatamente

---

### HU08 - Visualización de Agenda Diaria

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Veterinario |
| **Quiero** | Visualizar mis citas del día en orden cronológico |
| **Para** | Planificar mis consultas |

**Criterios de Aceptación:**
- Se muestra lista de citas del día actual
- Se incluye nombre de mascota, propietario y motivo
- Se indica el estado de cada cita (pendiente, en proceso, completada)
- Se puede filtrar por fecha específica

---

## 4. Historia Clínica

### HU09 - Registro de Consultas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Veterinario |
| **Quiero** | Registrar consultas con diagnósticos y tratamientos |
| **Para** | Mantener la historia clínica actualizada |

**Criterios de Aceptación:**
- Se capturan motivo, síntomas, diagnóstico y tratamiento
- Se registra peso y temperatura actual
- Se vincula automáticamente a la cita correspondiente
- Se guarda fecha, hora y veterinario que atendió

---

### HU10 - Adjuntar Resultados de Exámenes

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Veterinario |
| **Quiero** | Adjuntar resultados de exámenes e imágenes |
| **Para** | Complementar el seguimiento clínico |

**Criterios de Aceptación:**
- Se pueden subir archivos PDF, imágenes (JPG, PNG)
- Cada archivo se asocia a una consulta específica
- Se valida tamaño máximo de archivo (5MB)
- Los archivos son accesibles desde el historial

---

### HU11 - Consulta de Historial Médico

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Veterinario |
| **Quiero** | Consultar el historial médico completo de una mascota |
| **Para** | Tomar mejores decisiones clínicas |

**Criterios de Aceptación:**
- Se muestra cronología completa de consultas
- Se pueden ver todos los diagnósticos y tratamientos anteriores
- Se accede a archivos adjuntos de cada consulta
- La información está ordenada de más reciente a más antigua

---

## 5. Inventario

### HU12 - Registro de Medicamentos e Insumos

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Administrador |
| **Quiero** | Registrar medicamentos e insumos con su stock |
| **Para** | Controlar el inventario de la clínica |

**Criterios de Aceptación:**
- Se capturan nombre, categoría, cantidad, precio y stock mínimo
- Se registra fecha de vencimiento cuando aplique
- Se puede actualizar cantidad disponible
- Se valida que el stock no sea negativo

---

### HU13 - Alertas de Bajo Stock

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Auxiliar |
| **Quiero** | Recibir alertas cuando productos alcancen bajo stock |
| **Para** | Evitar faltantes de productos importantes |

**Criterios de Aceptación:**
- Se genera alerta cuando stock < stock mínimo
- Las alertas son visibles en el dashboard
- Se puede filtrar productos con bajo stock
- Se muestra cantidad actual vs cantidad mínima requerida

---

## 6. Facturación

### HU14 - Generación de Facturas

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Generar facturas por servicios prestados |
| **Para** | Entregar el soporte de cobro al cliente |

**Criterios de Aceptación:**
- Se agregan servicios y productos con sus precios
- Se calcula subtotal, impuestos y total automáticamente
- Se asocia la factura al propietario y mascota
- Se genera número de factura único y consecutivo

---

### HU15 - Historial de Facturación

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Administrador |
| **Quiero** | Consultar el historial de facturación con filtros |
| **Para** | Llevar control administrativo |

**Criterios de Aceptación:**
- Se listan todas las facturas con información básica
- Se puede filtrar por fecha, cliente o estado
- Se muestra total facturado por período
- Se puede exportar reporte a Excel/PDF

---

### HU16 - Registro de Pagos

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Recepcionista |
| **Quiero** | Marcar una factura como pagada presencialmente |
| **Para** | Mantener actualizado el estado de las ventas |

**Criterios de Aceptación:**
- Se puede cambiar estado de "pendiente" a "pagado"
- Se registra fecha y método de pago (efectivo, tarjeta, transferencia)
- No se pueden editar facturas ya pagadas
- El cambio de estado se refleja en los reportes

---

## 7. Reportes

### HU17 - Generación de Reportes

| **Campo** | **Descripción** |
|-----------|-----------------|
| **Como** | Administrador |
| **Quiero** | Generar reportes de ingresos, citas e inventario |
| **Para** | Tomar decisiones de gestión basadas en datos |

**Criterios de Aceptación:**
- Se generan reportes de: ingresos por período, citas realizadas, productos más vendidos
- Se pueden filtrar por rango de fechas
- Se visualizan gráficas y tablas resumen
- Se pueden exportar en formato PDF o Excel