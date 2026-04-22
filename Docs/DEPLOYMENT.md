# 🚀 Guía de Despliegue - HuellarioSoft Frontend

Esta guía te ayudará a desplegar la aplicación en diferentes entornos.

---

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0 o yarn >= 1.22.0
- Git
- Backend API funcionando (ver `/Docs/BackEnd/`)

---

## 🏗️ Construcción para Producción

### 1. Preparar el Entorno

```bash
# Clonar el repositorio (si es necesario)
git clone <repository-url>
cd huellariosoft

# Instalar dependencias
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` para producción:

```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones de producción:

```env
# URL de la API en producción
VITE_API_URL=https://api.tudominio.com/api

# Otros (opcional)
VITE_APP_NAME=HuellarioSoft
VITE_APP_VERSION=1.0.0
```

### 3. Ejecutar el Build

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados para producción.

---

## 🌐 Opciones de Despliegue

### Opción 1: Vercel (Recomendado)

#### Despliegue Automático desde GitHub

1. **Sube tu código a GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Importa tu repositorio
   - Configura las variables de entorno:
     - `VITE_API_URL`: URL de tu API

3. **Deploy**:
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"
   - Listo! Tu app estará en línea en minutos

#### Despliegue Manual con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

### Opción 2: Netlify

#### Desde GitHub

1. **Sube tu código a GitHub**
2. **En Netlify**:
   - Ve a [netlify.com](https://netlify.com)
   - "New site from Git"
   - Conecta tu repositorio
   - Configuración de build:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Variables de entorno:
     - `VITE_API_URL`: URL de tu API

#### Con Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

---

### Opción 3: AWS S3 + CloudFront

#### 1. Build del Proyecto

```bash
npm run build
```

#### 2. Crear Bucket S3

```bash
# Instalar AWS CLI
# https://aws.amazon.com/cli/

# Crear bucket
aws s3 mb s3://huellariosoft-frontend

# Habilitar hosting estático
aws s3 website s3://huellariosoft-frontend \
  --index-document index.html \
  --error-document index.html
```

#### 3. Subir Archivos

```bash
# Sincronizar archivos
aws s3 sync dist/ s3://huellariosoft-frontend \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html"

# index.html sin cache
aws s3 cp dist/index.html s3://huellariosoft-frontend/index.html \
  --cache-control "no-cache, no-store, must-revalidate"
```

#### 4. Configurar CloudFront

- Crear distribución CloudFront
- Origin: Tu bucket S3
- Default root object: `index.html`
- Error pages:
  - 404 -> `/index.html` (200) [Para React Router]
  - 403 -> `/index.html` (200)

---

### Opción 4: Servidor Propio (VPS/Dedicated)

#### Con Nginx

1. **Build del proyecto**:
```bash
npm run build
```

2. **Copiar archivos al servidor**:
```bash
scp -r dist/* user@your-server:/var/www/huellariosoft/
```

3. **Configurar Nginx**:

Crea `/etc/nginx/sites-available/huellariosoft`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /var/www/huellariosoft;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;

    # Cache estático
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

4. **Activar el sitio**:
```bash
sudo ln -s /etc/nginx/sites-available/huellariosoft /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

5. **Configurar SSL con Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

### Opción 5: Docker

#### Dockerfile

Crea `Dockerfile` en la raíz:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar archivos build
COPY --from=build /app/dist /usr/share/nginx/html

# Configuración de Nginx para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf

Crea `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=https://api.tudominio.com/api
    restart: unless-stopped
```

#### Comandos

```bash
# Build de la imagen
docker build -t huellariosoft-frontend .

# Ejecutar
docker run -p 3000:80 huellariosoft-frontend

# Con docker-compose
docker-compose up -d
```

---

## 🔧 Configuración Post-Despliegue

### 1. Verificar la Aplicación

- Abre la URL de tu aplicación
- Verifica que cargue correctamente
- Prueba el login
- Navega por los módulos

### 2. Configurar CORS en el Backend

Asegúrate de que tu backend acepte peticiones desde tu dominio frontend:

```javascript
// En tu backend (Express ejemplo)
app.use(cors({
  origin: 'https://tudominio.com',
  credentials: true
}));
```

### 3. Configurar DNS

Si usas un dominio personalizado:
- Apunta tu dominio a tu servidor/servicio
- Configura registros A/CNAME según el proveedor

### 4. SSL/HTTPS

**Importante**: Siempre usa HTTPS en producción:
- Vercel/Netlify: SSL automático
- AWS CloudFront: Configurar certificado ACM
- Servidor propio: Let's Encrypt (certbot)

---

## 📊 Monitoreo y Mantenimiento

### Logs y Errores

#### Vercel
```bash
vercel logs
```

#### Netlify
Ver logs en el dashboard de Netlify

#### Servidor Propio
```bash
# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Performance

- **Google PageSpeed Insights**: https://pagespeed.web.dev/
- **Lighthouse**: Auditoría en Chrome DevTools
- **GTmetrix**: https://gtmetrix.com/

### Actualizaciones

```bash
# En tu local
git pull origin main
npm install
npm run build

# Subir cambios
# Vercel/Netlify: Push a GitHub (deploy automático)
# Servidor propio: scp nuevos archivos
# Docker: Rebuild y redeploy
```

---

## 🔒 Checklist de Seguridad

- [ ] HTTPS habilitado
- [ ] Variables de entorno configuradas correctamente
- [ ] CORS configurado en backend
- [ ] Security headers configurados
- [ ] Archivos sensibles en `.gitignore`
- [ ] API keys no expuestas en el código
- [ ] Rate limiting en API
- [ ] Backups configurados

---

## 🚨 Solución de Problemas

### La aplicación no carga

1. Verifica que el build se completó sin errores
2. Revisa la consola del navegador para errores
3. Verifica que la URL de la API sea correcta
4. Revisa los logs del servidor/servicio

### Error 404 al recargar página

- Configura el servidor para redirigir todas las rutas a `index.html`
- Ver configuración de Nginx arriba

### API no responde

1. Verifica que el backend esté funcionando
2. Revisa configuración de CORS
3. Verifica la URL de la API en `.env`
4. Revisa los logs del backend

### Estilos no cargan

1. Verifica que Tailwind esté compilando correctamente
2. Revisa rutas de archivos CSS
3. Limpia caché del navegador

---

## 📚 Recursos Adicionales

- [Documentación de Vite](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Docker Documentation](https://docs.docker.com/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa esta guía cuidadosamente
2. Consulta la documentación del proveedor
3. Contacta al equipo de desarrollo

---

**HuellarioSoft © 2024** - Sistema de Gestión Veterinaria
