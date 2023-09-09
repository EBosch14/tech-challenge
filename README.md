# Encuestas Interactivas - README

## Descripción

Esta aplicación de encuestas interactivas permite a los usuarios crear y responder encuestas personalizadas. Utiliza tecnologías de vanguardia en el lado del servidor y del cliente para ofrecer una experiencia de usuario fluida y eficiente.

## Tecnologías Utilizadas

### Manejador de paquetes
- **pnpm**: version 8.7.4

### Backend

- **Lenguaje**: TypeScript
- **Servidor**: Express.js
- **Base de Datos**: MongoDB

### Frontend

- **Framework**: React.js
- **Diseño**: Tailwind CSS

## Instalación

1. Clona el repositorio desde [GitHub](https://github.com/tuusuario/encuestas-interactivas).

```bash
git clone https://github.com/EBosch14/tech-challenge.git
cd tech-challenge
```

2. Instala las dependencias tanto para el backend como para el frontend.

```bash
# En la carpeta del backend
cd server
npm install

# En la carpeta del frontend
cd client
npm install
```

3. Configura tu base de datos MongoDB y ajusta la conexión en `backend/src/config/database.ts`.

4. Inicia el servidor y la aplicación frontend en diferentes terminales (unicamente para env=dev, por ahora) .

```bash
# En la carpeta del backend
cd backend
npm run dev

# En la carpeta del frontend
cd frontend
npm run dev
```

La aplicación backend estará disponible en [http://localhost:3001](http://localhost:3001).
La aplicación frontend estará disponible en [http://localhost:3000](http://localhost:3000).

## Uso

### Crear una Nueva Encuesta

1. Abre la aplicación en tu navegador.
2. Haz clic en "Crear Encuesta" en la página de inicio.
3. Selecciona el archivo JSON que contiene las preguntas de la encuesta.
4. Completa la encuesta según tus preferencias.
5. Haz clic en "Enviar" para guardar la encuesta en la base de datos.

### Responder a una Encuesta

1. Abre la aplicación en tu navegador.
2. Responde las preguntas de la encuesta que te aparece en el inicio de la pagina.
3. Haz clic en "Enviar" para enviar tus respuestas.

### Ver Respuestas Almacenadas

1. Abre la aplicación en tu navegador.
2. Haz clic en "Ver Respuestas" en la página de inicio.
3. Selecciona una encuesta para ver las respuestas almacenadas.
4. Puedes actualizar tus respuestas si es necesario.

## Endpoints API
- **URL_API**: `http://localhost:3001/api`

### Obtener Formularios

- **URL**: `URL_API/form/`
- **Método**: GET
- **Descripción**: Obtiene la lista de formularios disponibles.

### Obtener Respuestas

- **URL**: `URL_API/answers/`
- **Método**: GET
- **Descripción**: Obtiene la lista de respuestas almacenadas.

### Obtener Respuesta por ID

- **URL**: `URL_API/answers/:id`
- **Método**: GET
- **Descripción**: Obtiene una respuesta específica por su ID.

### Crear Respuesta

- **URL**: `URL_API/answers/`
- **Método**: POST
- **Descripción**: Crea una nueva respuesta.

### Actualizar Respuesta

- **URL**: `URL_API/answers/:id`
- **Método**: PATCH
- **Descripción**: Actualiza una respuesta existente por su ID.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio desde [GitHub](https://github.com/EBosch14/tech-challenge).
2. Clona tu repositorio fork en tu máquina local.
3. Crea una nueva rama para tus cambios: `git checkout -b feature/nueva-funcion`.
4. Realiza tus cambios y asegúrate de que todo funcione correctamente.
5. Haz commit de tus cambios: `git commit -m "Añade nueva función"`.
6. Sube tus cambios a tu repositorio fork: `git push origin feature/nueva-funcion`.
7. Crea un pull request en GitHub para que tus cambios sean revisados y fusionados.

## Autor

- Enzo Bosch
- [Email](enzo.jbosch@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/enzo-bosch/)
