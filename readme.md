# EduSched - Backend RBAC System

  

## Descripción General

**EduSched** es un sistema backend para la gestión y programación de clases, basado en control de acceso por roles (RBAC) para instituciones educativas. Permite administrar usuarios (administradores, profesores y estudiantes), asignar horarios, gestionar clases y controlar el acceso a recursos según el rol.

  

**Tecnologías principales:**

- Node.js (ES Modules)
- Express.js
- MongoDB (Mongoose)
- JWT para autenticación
- Jest y Supertest para testing

**Principales funcionalidades:**

- Registro y autenticación de usuarios por rol (Admin, Profesor, Estudiante)
- Asignación y gestión de horarios de clases
- Gestión de profesores, estudiantes y clases
- Control de acceso seguro mediante JWT
- Endpoints RESTful para operaciones CRUD
- Testing automatizado de endpoints


---

## Arquitectura

  

**Estructura de carpetas:**

```

backend/
│
├── Controllers/ # Lógica de negocio y controladores de rutas
├── Middleware/ # Middlewares personalizados (ej: autenticación)
├── Models/ # Esquemas y modelos de Mongoose
├── Routes/ # Definición de rutas Express
├── Utils/ # Utilidades (ej: conexión a DB)
├── tests/ # Pruebas automatizadas (Jest/Supertest)
├── app.js # Configuración principal de Express
├── server.js # Arranque del servidor
├── package.json
├── .env.example
└── jest.config.js

```

  

**Patrón de arquitectura:**

Modelo Vista Controlador (MVC) adaptado para API RESTful.

  

---

## Requisitos Previos

- **Node.js** v18.x o superior
- **MongoDB** v6.x local o cuenta en MongoDB Atlas
- **npm** v9.x o superior
- Dependencias globales recomendadas:
- `nodemon` para desarrollo (`npm install -g nodemon`)


---

## Instalación

1. **Clonar el repositorio:**

```bash

git clone https://github.com/0xInterruptHandler/EduSched-backend.git

cd EduSched-backend/backend

```

2. **Instalar dependencias:**

```bash

npm install

```

3. **Configurar variables de entorno:**

- Copia `.env.example` a `.env` y edítalo con tus valores:

```

PORT=5000

MONGODBURL=mongodb://localhost:27017/edusched

SECRETKEY=tu-clave-secreta

```

  

---

  

## Configuración de Base de Datos

- Puedes usar MongoDB local o MongoDB Atlas.
- Ejemplo de string de conexión local:
```

MONGODBURL=mongodb://localhost:27017/edusched

```

- Ejemplo de string de conexión Atlas:
```

MONGODBURL=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/edusched?retryWrites=true&w=majority

```

---

## Ejecución del Proyecto

- **Modo desarrollo (con nodemon):**

```bash

npm run dev

```

- **Modo producción:**

```bash

npm start

```

- **Puerto por defecto:** `5000` (puedes cambiarlo en `.env` con la variable `PORT`).

---


## Endpoints de la API

| Método | Ruta                     | Descripción                                   | Autenticación |
| ------ | ------------------------ | --------------------------------------------- | ------------- |
| POST   | /api/auth/registrar      | Registrar usuario (Admin/Profesor/Estudiante) | No            |
| POST   | /api/auth/iniciarsesion  | Iniciar sesión y obtener token JWT            | No            |
| POST   | /api/auth/cerrarsesion   | Cerrar sesión (elimina cookie JWT)            | Sí            |
| GET    | /api/auth/getProfesores  | Listar todos los profesores                   | No            |
| GET    | /api/auth/getEstudiantes | Listar todos los estudiantes                  | No            |
| GET    | /api/auth/revisarUsuario | Obtener datos del usuario autenticado         | Sí            |
| ...    | ...                      | ...                                           | ...           |

  

**Ejemplo de request y response:**

- **Registro**

```json

POST /api/auth/registrar

{

"nombre": "Juan",

"correo": "juan@ejemplo.com",

"password": "123456",

"rol": "Profesor",

"departamento": "Matemáticas"

}

```

**Response:**

```json

{

"message": "Usuario registrado correctamente",

"Usuario": {

"_id": "64f1...",

"UsuarioNombre": "Juan",

"UsuarioCorreo": "juan@ejemplo.com",

"UsuarioRol": "Profesor",

...

}

}

```

  

- **Inicio de sesión**

```json

POST /api/auth/iniciarsesion

{

"correo": "juan@ejemplo.com",

"password": "123456"

}

```

**Response:**

```json

{

"success": true,

"message": "Inicio de sesion completado",

"Usuario": { ... },

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

}

```

  

---

  

## Middleware y Seguridad

- **Autenticación JWT:**

- Middleware `esUsuario` y `esAdmin` para proteger rutas según rol.

- **Validación de datos:**

- Validaciones básicas en controladores.

- **CORS:**

- Habilitado para permitir peticiones desde frontend.

- **Cookies seguras:**

- JWT almacenado en cookie HTTPOnly.

- **Otras medidas recomendadas:**

- Puedes agregar Helmet, rate limiting, etc.

  
---

## Testing

- **Librerías usadas:**
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)

- **Ejecutar pruebas:**
```bash

npm test

```
- Los tests se encuentran en la carpeta `/backend/tests/` y cubren endpoints de autenticación y usuarios.

---

## Despliegue
1. **Variables de entorno necesarias en producción:**
- `PORT`
- `MONGODBURL`
- `SECRETKEY`

1. **Pasos generales:**
- Sube el código a tu servicio cloud (Heroku, Render, Railway, etc.).
- Configura las variables de entorno en el panel del servicio.
- Asegúrate de que tu base de datos sea accesible desde el entorno cloud.
- Usa el comando `npm start` para producción.
