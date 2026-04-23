import logoOnly from '@assets/img/ONLY_LOGO.png'

/**
 * Layout para páginas de autenticación (Login, etc.)
 * Diseño minimalista y elegante con ilustraciones veterinarias
 */
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo - Branding e ilustración */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 overflow-hidden">
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Contenido del panel */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center p-2">
              <img src={logoOnly} alt="HuellarioSoft" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-bold">HuellarioSoft</span>
          </div>

          {/* Mensaje central */}
          <div className="space-y-6 max-w-md">
            <h1 className="text-5xl font-bold leading-tight">
              Gestión Veterinaria Profesional
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Simplifica la administración de tu clínica veterinaria con
              tecnología de vanguardia diseñada para el cuidado de mascotas.
            </p>

            {/* Características destacadas */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Historias clínicas digitales</p>
                  <p className="text-sm text-white/70">
                    Acceso rápido al historial médico completo
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Agenda inteligente</p>
                  <p className="text-sm text-white/70">
                    Gestiona citas y recordatorios automáticos
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Control de inventario</p>
                  <p className="text-sm text-white/70">
                    Alertas de stock y gestión de productos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-white/60">
            © 2026 HuellarioSoft. Todos los derechos reservados.
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          {/* Logo móvil */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img src={logoOnly} alt="HuellarioSoft" className="w-12 h-12 object-contain" />
            </div>
            <span className="text-2xl font-bold text-primary-600">
              HuellarioSoft
            </span>
          </div>

          {/* Contenido del formulario */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
