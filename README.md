# 🛟 Lotería Backend

## API REST para la gestión de una aplicación de lotería, construida con **Express.js** y **Sequelize**.

## 🗒️ Características principales

- Autenticación JWT para clientes, administradores y vendedores
- Gestión de usuarios, perfiles y avatares
- Administración de juegos, sorteos y jugadas
- Sistema de sorteos automáticos con tareas cron
- Envío de correos electrónicos (recuperación, notificaciones)
- Documentación OpenAPI (Swagger)

---

## 🗂️ Estructura del proyecto

```
/ seminario
├── src/
│   ├── config/           # Configuración de base de datos, correo, multer, swagger
│   ├── controladores/    # Lógica de endpoints (admin, auth, clientes, vendedores)
│   ├── docs/             # Documentación OpenAPI en YAML
│   ├── middlewares/      # Middlewares de autenticación y validación
│   ├── modelos/          # Modelos Sequelize
│   ├── rutas/            # Definición de rutas Express
│   ├── servicios/        # Lógica de negocio (sorteos, correo)
│   ├── utils/            # Utilidades generales
│   └── validaciones/     # Validaciones de datos
├── public/               # Archivos estáticos (avatares, etc)
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
├── README.md             # Este archivo
```

---

## ⚙️ Configuración y variables de entorno

Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
# Base de datos
DB_NAME=
DB_USER=
DB_PASS=
DB_HOST=

# JWT
JWT_SECRET=

# Administrador por defecto
ADMIN_USER=
ADMIN_PASS=
ADMIN_NAME=
ADMIN_SURNAME=

# Correo electrónico
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=

# Servidor
SERVER_PORT=

# Aplicación
APP_NAME=
```

---

## 🏁 Instalación y ejecución

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
3. Accede a la documentación interactiva:
   - [http://localhost:8080/api/docs](http://localhost:8080/api/docs)

---

## 📚 Documentación de la API

La documentación OpenAPI está disponible en `/api/docs` y en los archivos YAML dentro de `src/docs/`.

---

## 🛠️ Scripts útiles

- `npm run dev` — Ejecuta el servidor con recarga automática
- `npm start` — Ejecuta el servidor en modo producción
