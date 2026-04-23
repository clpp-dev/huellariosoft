# Requisitos No Funcionales (RNF)

Los requisitos no funcionales describen cómo debe funcionar el sistema.

---

## 1. Rendimiento

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF01** | Tiempo de respuesta | El sistema debe responder a las solicitudes principales del usuario en menos de 3 segundos para garantizar una experiencia fluida. |
| **RNF02** | Concurrencia de usuarios | El sistema debe soportar múltiples usuarios concurrentes sin degradación significativa del rendimiento o tiempos de espera. |

---

## 2. Seguridad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF03** | Cifrado de contraseñas | Las contraseñas deben almacenarse cifradas mediante algoritmos seguros (bcrypt o superior) para proteger la información de acceso. |
| **RNF04** | Autenticación segura | El sistema debe implementar autenticación segura mediante tokens JWT o sesiones protegidas con mecanismos de expiración. |
| **RNF05** | Cumplimiento legal de protección de datos | El sistema debe cumplir con la Ley 1581 de 2012 sobre protección de datos personales en Colombia (Habeas Data). |
| **RNF06** | Control de acceso basado en roles | El sistema debe restringir el acceso a funcionalidades y datos según los roles y permisos asignados a cada usuario. |

---

## 3. Disponibilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF07** | Disponibilidad del sistema | El sistema debe estar disponible y operativo al menos el 99% del tiempo durante las horas de operación de la clínica. |
| **RNF08** | Respaldos automáticos | Debe existir un sistema de respaldo automático de la base de datos con frecuencia diaria para prevenir pérdida de información. |

---

## 4. Usabilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF09** | Interfaz intuitiva | La interfaz debe ser intuitiva, clara y fácil de usar para personal no técnico, minimizando la curva de aprendizaje. |
| **RNF10** | Diseño responsive | El sistema debe ser responsive y adaptable a diferentes dispositivos: computadores de escritorio, tablets y dispositivos móviles. |

---

## 5. Escalabilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF11** | Arquitectura modular | La arquitectura debe permitir agregar nuevos módulos y funcionalidades sin afectar el funcionamiento de los módulos existentes. |
| **RNF12** | Crecimiento de datos y usuarios | El sistema debe permitir crecimiento en volumen de usuarios y datos sin requerir cambios significativos en la arquitectura. |

---

## 6. Mantenibilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF13** | Código documentado | El código debe estar estructurado, comentado y documentado adecuadamente para facilitar el mantenimiento y actualizaciones futuras. |
| **RNF14** | Buenas prácticas de desarrollo | El sistema debe seguir buenas prácticas de desarrollo, patrones de diseño reconocidos y arquitectura modular escalable. |

---

## 7. Compatibilidad

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF15** | Compatibilidad con navegadores | El sistema debe ser compatible con navegadores web modernos: Google Chrome, Microsoft Edge y Mozilla Firefox en sus versiones recientes. |

---

## 8. Tecnología

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF16** | Stack de Frontend | El frontend debe desarrollarse utilizando React como librería principal y Vite como herramienta de construcción. |
| **RNF17** | Stack de Backend | El backend debe desarrollarse utilizando Node.js como entorno de ejecución y Express como framework web. |
| **RNF18** | Base de datos | La base de datos debe implementarse utilizando MongoDB como sistema de gestión de base de datos NoSQL. |

---

## 9. Calidad de la Información

| CÓDIGO | NOMBRE DEL REQUISITO | DESCRIPCIÓN |
|--------|----------------------|-------------|
| **RNF19** | Validación de datos | El sistema debe validar todos los datos ingresados mediante reglas de negocio para evitar registros incompletos, erróneos o inconsistentes. |
| **RNF20** | Integridad de información clínica | La información clínica debe mantenerse íntegra, consistente y trazable en todo momento para garantizar la confiabilidad de los datos médicos. |