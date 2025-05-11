# Backend - Proyecto de Desarrollo de Software

Este proyecto es el backend de una aplicación web, desarrollado con **Spring Boot** y **GraphQL**. Está diseñado para gestionar usuarios, posts y autenticación con JWT. La base de datos está gestionada con **JPA** y se utiliza **Liquibase** para la gestión de migraciones. Este proyecto está configurado para usar **SQL Server 2022** como base de datos.

## Requisitos previos

Antes de levantar el backend, asegúrate de tener las siguientes herramientas instaladas:

- **Java 17+** (recomendado)
- **Maven** (para la gestión de dependencias y ejecución)
- **SQL Server 2022** (configurado en `application.properties`)
- **Liquibase** (se utiliza para gestionar las migraciones de la base de datos)
- **Por recomendación** usar **Intellij idea**.
## Pasos para levantar el backend

Sigue los siguientes pasos para levantar el backend en tu entorno local:

### 1. Clonar el repositorio

Primero, clona el repositorio a tu máquina local:

```bash
git clone https://github.com/Alex-Trejo/test_spring_boot_angular_sql_server.git
cd test_spring_boot_angular_sql_server
cd backend
```

### 2. Clonar el repositorio
Este proyecto está configurado para usar SQL Server 2022.

Asegúrate de tener SQL Server 2022 funcionando en tu máquina local, servidor o en docker.

Crea una base de datos llamada backend_db.

Configura los detalles de la base de datos en el archivo src/main/resources/application.properties:

```bash
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=backend_db
spring.datasource.username=usuario
spring.datasource.password=contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.SQLServerDialect
```

### 3. Ejecutar las migraciones de Liquibase
Liquibase se encarga de aplicar las migraciones a la base de datos. La primera vez que levantes la aplicación, ejecutará las migraciones automáticamente.

Para aplicar las migraciones, puedes ejecutar el siguiente comando Maven:

```bash
mvn liquibase:update
```

Esto creará las tablas necesarias en la base de datos.

Importante: Después de ejecutar las migraciones por primera vez, debes ingresar manualmente los primeros datos en la base de datos (como un usuario ADMIN) para poder realizar pruebas y validaciones.


### 4. Ejecutar la aplicación
Para ejecutar el backend, usa Maven con el siguiente comando:

```bash
mvn spring-boot:run
```

Esto iniciará la aplicación Spring Boot en el puerto 8080 por defecto. Puedes acceder a la aplicación en:

```bash
http://localhost:8080/graphql
```

## Opcion de graphql navegador
Aqui se puede observar las rutas implementadas (query and mutation)
```bash
http://localhost:8080/graphiql
```
### 5. Pruebas y validaciones
En las consultas que sean solo de acceso para el administrador se debe agregar en el header

- Authorization : Bearer <token>

## Consultas (Query)

- **Obtener todos los usuarios (solo ADMIN)**:  
  `getUsers`  
  `GET /graphql`

- **Obtener un usuario específico por ID (solo ADMIN)**:  
  `getUser(id: ID!)`  
  `GET /graphql`

- **Obtener todos los posts públicos sin autenticación**:  
  `getPosts`  
  `GET /graphql`

- **Obtener posts públicos**:  
  `getPublicPosts`  
  `GET /graphql`

- **Obtener posts del usuario autenticado**:  
  `getMyPosts`  
  `GET /graphql`

- **Obtener un post específico por ID**:  
  `getPost(postId: ID!)`  
  `GET /graphql`

## Mutaciones (Mutation)

- **Registro de usuario**:  
  `register(username: String!, password: String!)`  
  `POST /graphql`

- **Login de usuario**:  
  `login(username: String!, password: String!)`  
  `POST /graphql`

- **Crear un post (usuario autenticado)**:  
  `createPost(title: String!, content: String!, isPublic: Boolean!)`  
  `POST /graphql`

- **Editar un post (usuario autenticado solo sus propios posts)**:  
  `editPost(postId: ID!, title: String, content: String, isPublic: Boolean!)`  
  `POST /graphql`

- **Eliminar un post (usuario autenticado solo sus propios posts)**:  
  `deletePost(postId: ID!)`  
  `POST /graphql`

- **Crear un usuario (solo ADMIN)**:  
  `createUser(username: String!, password: String!, role: String!)`  
  `POST /graphql`

- **Editar un usuario (solo ADMIN)**:  
  `editUser(id: ID!, username: String, password: String, role: String)`  
  `POST /graphql`

- **Eliminar un usuario (solo ADMIN)**:  
  `deleteUser(id: ID!)`  
  `POST /graphql`

- **Refrescar el token de acceso**:  
  `refreshToken(refreshToken: String!)`  
  `POST /graphql`



### 6. Estructura del proyecto
A continuación se presenta una visión general de la estructura del proyecto:

```bash
backend/
│── src/main/java/com/example/backend/
│   ├── config/               # Configuración de seguridad, JWT y GraphQL
│   │   ├── SecurityConfig.java
│   │   ├── JwtUtil.java
│   │   ├── CorsConfig.java
│   ├── controller/           # Controladores (GraphQL Resolvers)
│   │   ├── AuthResolver.java
│   │   ├── UserResolver.java
│   │   ├── PostResolver.java
│   ├── dto/                  # DTOs para transferencia de datos
│   │   ├── AuthRequest.java
│   │   ├── AuthResponse.java
│   │   ├── UserDTO.java
│   │   ├── PostDTO.java
│   ├── entity/               # Entidades JPA
│   │   ├── User.java
│   │   ├── Post.java
│   ├── repository/           # Capa de acceso a datos
│   │   ├── UserRepository.java
│   │   ├── PostRepository.java
│   ├── service/              # Capa de lógica de negocio
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── PostService.java
│   ├── util/                 # Utilidades generales
│   │   ├── Role.java
│   ├── BackendApplication.java
│── src/main/resources/
│   ├── application.properties       # Configuración de Spring Boot
│  ├──graphql
│   	├── schema.graphqls       # Definición del esquema GraphQL
│   ├── db/
│   │   ├── changelog/
│   │   │   ├── db.changelog-master.xml
│   │   │   ├── db.changelog-001.xml
│── pom.xml                   # Dependencias de Maven
```
