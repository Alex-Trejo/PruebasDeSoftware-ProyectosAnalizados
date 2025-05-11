# Frontend - Angular 19 - GraphQL

Este proyecto es el frontend de una aplicación construida con Angular 19 que interactúa con un backend en Spring Boot usando GraphQL. La aplicación permite realizar operaciones de autenticación (registro, login), y CRUD de usuarios y publicaciones. Los datos se gestionan mediante GraphQL y se almacenan en un servidor SQL Server.


## Tecnologías utilizadas

- **Angular 19**: Framework para construir la aplicación de una sola página (SPA).
- **GraphQL**: API para interactuar con el backend de manera eficiente.
- **Apollo Client**: Librería para interactuar con la API GraphQL.
- **Apollo Angular**: Se utiliza para interactuar con el servidor GraphQL.
- **PrimeNG**: Librería de componentes UI para Angular.
- **LocalStorage**: Se usa para almacenar el token JWT en el navegador del cliente una vez que el usuario ha iniciado sesión, lo que permite autenticar las solicitudes subsecuentes al backend.
- **RxJS**: Librería para manejo de programación reactiva.
- **TypeScript**: Lenguaje utilizado para el desarrollo de la aplicación.


### Funcionalidades:
- **Login/Registro**: Los usuarios pueden registrarse e iniciar sesión en la aplicación, con un token JWT almacenado en `localStorage`.
- **CRUD de Usuarios**: Los administradores pueden ver, crear, editar y eliminar usuarios.
- **CRUD de Publicaciones**: Los usuarios pueden crear, editar, ver y eliminar publicaciones.
- **Protección de rutas**: Algunas rutas están protegidas y requieren un token de autenticación (JWT) para acceder.



## Instalación y Ejecución

### Requisitos previos

1. **Instalar Node.js y npm**: Asegúrate de tener [Node.js](https://nodejs.org/) y [npm](https://npmjs.com) instalados en tu sistema.
   
2. **Instalar Angular CLI**:
   Si aún no tienes Angular CLI instalado, puedes instalarlo globalmente con el siguiente comando:

   ```bash
   npm install -g @angular/cli
   ```

### Pasos para ejecutar el proyecto
1. **Clonar el repositorio**:

    ```bash
    git clone https://github.com/Alex-Trejo/test_spring_boot_angular_sql_server.git
    ```
    ```bash
    cd frontend
    ```

2. **Instalar dependencias**: 
    Ejecuta el siguiente comando para instalar las dependencias necesarias:
    ```bash
    npm install
    ```

3. **Construir el proyecto**: 
    Si deseas construir el proyecto para producción, puedes usar:
    ```bash
    ng build
    ```

4. **Iniciar el servidor de desarrollo**: 
    Para correr la aplicación en modo desarrollo, usa:

    ```bash
    ng serve
    ```
> [!IMPORTANT]  
> Luego accede a la aplicación en tu navegador a través de [http://localhost:4200](http://localhost:4200).



## Rutas

- **/login**: Ruta de inicio de sesión. Permite a los usuarios ingresar sus credenciales.

- **/register**: Ruta para el registro de nuevos usuarios.

- **/posts**: Muestra las publicaciones disponibles. Requiere autenticación.

- **/users**: Muestra la lista de usuarios. Requiere autenticación y rol de administrador.

## Autenticación
El sistema de autenticación está basado en JWT (JSON Web Tokens). Cuando un usuario inicia sesión con éxito, el backend envía un token JWT que se almacena en el localStorage. Este token se utiliza en las cabeceras de las solicitudes subsecuentes para autenticar al usuario. Las rutas protegidas requieren este token para acceder a los datos.

### Manejo del Token:
- **Almacenamiento** : El token se guarda en el localStorage del navegador.
- **Autenticación en las solicitudes**: El token se incluye en los encabezados de las solicitudes HTTP para validar al usuario.


## Estructura del proyecto

La estructura del proyecto se organiza de la siguiente manera:

```bash
frontend/
│-- .angular\cache\19.2.4\frontend
│-- .vscode
│-- dist\frontend
│-- node_modules
│-- public
│-- src
│   ├── app
│   │   ├── core
│   │   │   ├── graphql
│   │   │   │   ├── mutatinos
│   │   │   │   │   ├── .gitkeep
│   │   │   │   │   ├── auth.mutation.ts
│   │   │   │   │   ├── post.mutation.ts
│   │   │   │   │   ├── user.mutation.ts
│   │   │   │   ├── querys
│   │   │   │   │   ├── .gitkeep
│   │   │   │   │   ├── posts.query.ts
│   │   │   │   │   ├── user.query.ts
│   │   │   ├── services
│   │   │   │   ├── .gitkeep
│   │   │   │   ├── auth.service.spec.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── posts.service.spec.ts
│   │   │   │   ├── posts.service.ts
│   │   │   │   ├── user.service.spec.ts
│   │   │   │   ├── user.service.ts
│   │   ├── domain\constants
│   │   │   ├── endpoints.ts
│   │   ├── presentation
│   │   │   ├── components
│   │   │   │   ├── posts
│   │   │   │   │   ├── posts.component.html
│   │   │   │   │   ├── posts.component.scss
│   │   │   │   │   ├── posts.component.spec.ts
│   │   │   │   │   ├── posts.component.ts
│   │   │   │   ├── user
│   │   │   │   │   ├── user.component.html
│   │   │   │   │   ├── user.component.scss
│   │   │   │   │   ├── user.component.spec.ts
│   │   │   │   │   ├── user.component.ts
│   │   │   │   ├── crud-posts
│   │   │   │   │   ├── crud-posts.component.html
│   │   │   │   │   ├── crud-posts.component.scss
│   │   │   │   │   ├── crud-posts.component.spec.ts
│   │   │   │   │   ├── crud-posts.component.ts
│   │   │   │   ├── crud-user
│   │   │   │   ├── home
│   │   │   │   ├── login
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   ├── login.component.scss
│   │   │   │   │   ├── login.component.spec.ts
│   │   │   │   │   ├── login.component.ts
│   │   ├── .gitkeep
│   │   ├── apollo.config.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── styles.scss
│-- .editorconfig
│-- .gitignore
│-- angular.json
│-- package-lock.json
│-- package.json
│-- README.md
│-- tsconfig.app.json
│-- tsconfig.json
│-- tsconfig.spec.json
│-- LICENSE
```


## Funcionalidades

### Login y Registro
- **Login**: Permite a los usuarios loguearse utilizando su nombre de usuario y contraseña. Al hacerlo, se guarda un token JWT en el almacenamiento local del navegador.
- **Registro**: Los usuarios pueden crear nuevas cuentas proporcionando un nombre de usuario y una contraseña.

### CRUD de Usuarios
- **Crear Usuario**: Los usuarios con privilegios pueden crear nuevos usuarios.
- **Editar Usuario**: Los administradores pueden editar usuarios existentes.
- **Eliminar Usuario**: Los administradores pueden eliminar usuarios.

### CRUD de Posts
- **Crear Post**: Los usuarios pueden crear nuevos posts.
- **Editar Post**: Los usuarios pueden editar sus propios posts.
- **Eliminar Post**: Los usuarios pueden eliminar sus propios posts.
- **Obtener Posts Públicos**: Los usuarios pueden ver posts públicos creados por otros usuarios.

## Rutas principales

- **/login**: Página de inicio de sesión.
- **/register**: Página de registro de usuarios.
- **/home**: Página principal que muestra la lista de posts.
- **/crud-posts**: Página donde los usuarios pueden crear, editar y eliminar posts.
- **/crud-user**: Página donde los administradores pueden gestionar los usuarios.

## Dependencias

El proyecto utiliza varias dependencias de Node.js. Para instalar las dependencias, asegúrate de tener Node.js y npm instalados en tu máquina. Luego, corre el siguiente comando:

```bash
npm install
```

## Cómo correr la aplicación
Para correr la aplicación localmente en modo de desarrollo, usa el siguiente comando:

```bash
ng serve
```

Esto arrancará el servidor de desarrollo y la aplicación estará disponible en `http://localhost:4200`.

### Opciones adicionales

- **Para compilar la aplicación en modo de producción**, puedes usar:
```bash
npm run build
```

## Configuración

En el archivo `app.config.ts`, puedes configurar la URL del servidor de backend y otras configuraciones necesarias para interactuar con el backend de GraphQL.

## Servicios

### AuthService
- **signUp(username: string, password: string)**: Registra un nuevo usuario.
- **logIn(username: string, password: string)**: Inicia sesión para obtener un token JWT.

### UserService
- **getUsers(authToken: string)**: Obtiene todos los usuarios.
- **createUser(username: string, password: string, role: string, authToken: string)**: Crea un nuevo usuario.
- **deleteUser(id: string, authToken: string)**: Elimina un usuario.
- **editUser(id: string, username: string, password: string, role: string, authToken: string)**: Edita los datos de un usuario.

### PostsService
- **getAllPublicPosts()**: Obtiene todos los posts públicos.
- **getMyPosts(authToken: string)**: Obtiene los posts propios de un usuario.
- **createPost(title: string, content: string, isPublic: boolean, authToken: string)**: Crea un nuevo post.
- **deletePost(postId: string, authToken: string)**: Elimina un post.
- **editPost(postId: string, title: string, content: string, isPublic: boolean, authToken: string)**: Edita un post.

## Notas
- Este frontend se conecta a un backend en GraphQL para manejar las operaciones de autenticación, usuarios y posts.
- Los tokens JWT se guardan en el almacenamiento local del navegador y se usan para autenticar las solicitudes.
- Asegúrate de tener el backend correctamente configurado y corriendo para que las consultas y mutaciones de GraphQL funcionen correctamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

