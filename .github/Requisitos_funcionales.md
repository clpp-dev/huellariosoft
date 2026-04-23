# Requisitos Funcionales (RF)

Los requisitos funcionales describen qué debe hacer el sistema.

---

## 1. Gestión de Usuarios y Acceso

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF01** | Registro de usuarios | El sistema debe permitir el registro de usuarios autorizados (administrador, veterinario, recepcionista y auxiliar) con sus datos básicos y credenciales de acceso. |
| **RF02** | Autenticación segura | El sistema debe permitir el inicio y cierre de sesión mediante autenticación segura utilizando credenciales únicas (email y contraseña). |
| **RF03** | Gestión de roles y permisos | El sistema debe gestionar roles y permisos según el tipo de usuario, restringiendo el acceso a funcionalidades específicas según su rol asignado. |
| **RF04** | Administración de usuarios | El administrador debe poder crear, editar, desactivar y eliminar usuarios del sistema, manteniendo la trazabilidad de los cambios realizados. |

---

## 2. Gestión de Pacientes (Mascotas)

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF05** | Registro de mascotas | El sistema debe permitir registrar mascotas con información completa: nombre, especie, raza, sexo, edad, peso, color, estado reproductivo, foto y observaciones clínicas relevantes. |
| **RF06** | Asociación mascota-propietario | El sistema debe permitir asociar cada mascota con su propietario correspondiente, estableciendo una relación clara entre ambos registros. |
| **RF07** | Actualización de información de mascotas | El sistema debe permitir consultar, editar y actualizar la información de las mascotas registradas, manteniendo el historial de cambios. |
| **RF08** | Búsqueda de mascotas | El sistema debe permitir buscar mascotas por múltiples criterios: nombre, propietario, documento del propietario o número de historia clínica. |

---

## 3. Gestión de Propietarios

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF09** | Registro de propietarios | El sistema debe permitir registrar propietarios con información completa: nombre completo, documento de identidad, teléfono, correo electrónico y dirección de residencia. |
| **RF10** | Actualización de información de propietarios | El sistema debe permitir consultar, editar y actualizar la información de los propietarios registrados en el sistema. |

---

## 4. Gestión de Citas Veterinarias

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF11** | Agendamiento de citas | El sistema debe permitir agendar citas veterinarias especificando la mascota, propietario y tipo de servicio requerido. |
| **RF12** | Asignación de recursos para citas | El sistema debe permitir asignar fecha, hora, veterinario responsable y motivo de consulta para cada cita programada. |
| **RF13** | Reprogramación y cancelación | El sistema debe permitir reprogramar o cancelar citas existentes, registrando el motivo del cambio o cancelación. |
| **RF14** | Visualización de calendario | El sistema debe permitir visualizar el calendario de citas en vistas diaria, semanal y mensual para facilitar la planificación. |
| **RF15** | Recordatorios de citas | El sistema debe permitir enviar recordatorios automáticos de citas a los clientes mediante notificaciones o mensajes. |

---

## 5. Historia Clínica Veterinaria

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF16** | Registro de consultas médicas | El sistema debe permitir registrar consultas médicas completas incluyendo motivo, síntomas, examen físico y evolución clínica del paciente. |
| **RF17** | Almacenamiento de información clínica | El sistema debe almacenar toda la información clínica relevante: diagnósticos, tratamientos prescritos, vacunas aplicadas, cirugías realizadas, exámenes solicitados y observaciones médicas. |
| **RF18** | Adjuntar archivos clínicos | El sistema debe permitir adjuntar archivos digitales como resultados de exámenes de laboratorio, imágenes radiográficas, ecografías u otros documentos clínicos. |
| **RF19** | Consulta de historial médico | El sistema debe permitir consultar el historial clínico completo de cada paciente de forma cronológica y organizada. |

---

## 6. Gestión de Inventario

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF20** | Registro de productos | El sistema debe permitir registrar productos veterinarios, medicamentos e insumos con información como nombre, categoría, precio, stock y fecha de vencimiento. |
| **RF21** | Control de movimientos de inventario | El sistema debe controlar y registrar todas las entradas y salidas de inventario, manteniendo actualizado el stock disponible. |
| **RF22** | Alertas de stock mínimo | El sistema debe generar alertas automáticas cuando los productos alcancen el nivel de stock mínimo configurado. |
| **RF23** | Actualización de precios y cantidades | El sistema debe permitir actualizar precios y cantidades disponibles de los productos en inventario de forma ágil y precisa. |

---

## 7. Facturación

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF24** | Generación de facturas | El sistema debe permitir generar facturas detalladas por consultas, procedimientos, medicamentos y servicios veterinarios prestados a los clientes. |
| **RF25** | Cálculo automático de valores | El sistema debe calcular automáticamente subtotales, impuestos aplicables y valor total de la factura según los productos y servicios incluidos. |
| **RF26** | Gestión de estados de factura | El sistema debe permitir registrar y actualizar el estado de cada factura: pendiente, pagada presencialmente o anulada. |
| **RF27** | Historial de facturación | El sistema debe permitir consultar el historial completo de facturación de cada cliente y mascota para seguimiento financiero. |
| **RF28** | Impresión y exportación de facturas | El sistema debe permitir imprimir o exportar facturas en formato PDF para entrega al cliente o archivo. |

---

## 8. Reportes y Estadísticas

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF29** | Generación de reportes | El sistema debe generar reportes estadísticos sobre: citas atendidas, ingresos por período, estado de inventario, pacientes registrados y servicios más frecuentes solicitados. |
| **RF30** | Exportación de reportes | El sistema debe permitir exportar reportes generados en formatos PDF o Excel para análisis externo o presentaciones. |

---

## 9. Auditoría y Trazabilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RF31** | Registro de auditoría | El sistema debe registrar automáticamente todas las acciones importantes realizadas por los usuarios incluyendo fecha, hora y usuario responsable. |
| **RF32** | Trazabilidad de cambios críticos | El sistema debe mantener trazabilidad completa sobre cambios realizados en historias clínicas y facturación para garantizar integridad de la información. |

