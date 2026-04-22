// Roles del sistema
export const ROLES = {
  ADMIN: 'administrador',
  VETERINARIAN: 'veterinario',
  RECEPTIONIST: 'recepcionista',
  AUXILIARY: 'auxiliar',
}

// Etiquetas legibles de roles
export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Administrador',
  [ROLES.VETERINARIAN]: 'Veterinario',
  [ROLES.RECEPTIONIST]: 'Recepcionista',
  [ROLES.AUXILIARY]: 'Auxiliar',
}

// Estados de citas
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'programada',
  CONFIRMED: 'confirmada',
  IN_PROGRESS: 'en_progreso',
  COMPLETED: 'completada',
  CANCELLED: 'cancelada',
  NO_SHOW: 'no_asistio',
}

// Etiquetas de estados de citas
export const APPOINTMENT_STATUS_LABELS = {
  [APPOINTMENT_STATUS.SCHEDULED]: 'Programada',
  [APPOINTMENT_STATUS.CONFIRMED]: 'Confirmada',
  [APPOINTMENT_STATUS.IN_PROGRESS]: 'En Progreso',
  [APPOINTMENT_STATUS.COMPLETED]: 'Completada',
  [APPOINTMENT_STATUS.CANCELLED]: 'Cancelada',
  [APPOINTMENT_STATUS.NO_SHOW]: 'No Asistió',
}

// Colores de estados de citas
export const APPOINTMENT_STATUS_COLORS = {
  [APPOINTMENT_STATUS.SCHEDULED]: 'bg-blue-100 text-blue-800',
  [APPOINTMENT_STATUS.CONFIRMED]: 'bg-green-100 text-green-800',
  [APPOINTMENT_STATUS.IN_PROGRESS]: 'bg-yellow-100 text-yellow-800',
  [APPOINTMENT_STATUS.COMPLETED]: 'bg-gray-100 text-gray-800',
  [APPOINTMENT_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
  [APPOINTMENT_STATUS.NO_SHOW]: 'bg-orange-100 text-orange-800',
}

// Estados de factura
export const INVOICE_STATUS = {
  PENDING: 'pendiente',
  PAID: 'pagada',
  CANCELLED: 'anulada',
}

// Etiquetas de estados de factura
export const INVOICE_STATUS_LABELS = {
  [INVOICE_STATUS.PENDING]: 'Pendiente',
  [INVOICE_STATUS.PAID]: 'Pagada',
  [INVOICE_STATUS.CANCELLED]: 'Anulada',
}

// Colores de estados de factura
export const INVOICE_STATUS_COLORS = {
  [INVOICE_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [INVOICE_STATUS.PAID]: 'bg-green-100 text-green-800',
  [INVOICE_STATUS.CANCELLED]: 'bg-red-100 text-red-800',
}

// Especies de mascotas
export const PET_SPECIES = {
  DOG: 'Canino',
  CAT: 'Felino',
  BIRD: 'Ave',
  RABBIT: 'Conejo',
  RODENT: 'Roedor',
  REPTILE: 'Reptil',
  OTHER: 'Otro',
}

// Sexo de mascotas
export const PET_SEX = {
  MALE: 'Macho',
  FEMALE: 'Hembra',
}

// Unidades de edad
export const AGE_UNITS = {
  DAYS: 'días',
  WEEKS: 'semanas',
  MONTHS: 'meses',
  YEARS: 'años',
}

// Tipos de productos de inventario
export const PRODUCT_TYPES = {
  MEDICATION: 'medicamento',
  SUPPLY: 'insumo',
  FOOD: 'alimento',
  ACCESSORY: 'accesorio',
  OTHER: 'otro',
}

// Etiquetas de tipos de productos
export const PRODUCT_TYPE_LABELS = {
  [PRODUCT_TYPES.MEDICATION]: 'Medicamento',
  [PRODUCT_TYPES.SUPPLY]: 'Insumo',
  [PRODUCT_TYPES.FOOD]: 'Alimento',
  [PRODUCT_TYPES.ACCESSORY]: 'Accesorio',
  [PRODUCT_TYPES.OTHER]: 'Otro',
}

// Tipos de movimiento de inventario
export const INVENTORY_MOVEMENT_TYPES = {
  ENTRY: 'entrada',
  EXIT: 'salida',
  ADJUSTMENT: 'ajuste',
}

// Tipos de registro en historia clínica
export const CLINICAL_RECORD_TYPES = {
  CONSULTATION: 'consulta',
  VACCINE: 'vacuna',
  SURGERY: 'cirugia',
  EXAM: 'examen',
  PROCEDURE: 'procedimiento',
}

// Etiquetas de tipos de registro clínico
export const CLINICAL_RECORD_TYPE_LABELS = {
  [CLINICAL_RECORD_TYPES.CONSULTATION]: 'Consulta',
  [CLINICAL_RECORD_TYPES.VACCINE]: 'Vacuna',
  [CLINICAL_RECORD_TYPES.SURGERY]: 'Cirugía',
  [CLINICAL_RECORD_TYPES.EXAM]: 'Examen',
  [CLINICAL_RECORD_TYPES.PROCEDURE]: 'Procedimiento',
}
