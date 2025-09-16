# 📝 Todo API Assignment

Учебное задание: REST API для управления списком задач (**todo list**) на **Node.js + Express**.  
Реализованы эндпоинты, валидация данных, обработка ошибок, Swagger-документация и коллекция Postman с автотестами.

---

## Запуск
```bash
git clone https://github.com/username/todo-assignment.git
cd todo-assignment
npm install
npm start
```
Сервер: http://localhost:3000

Документация Swagger: http://localhost:3000/docs

## 📌 Эндпоинты

## POST /auth/register

\*\*Request Body (application/json)\*\*

- `username`: string
- `password`: string

\*\*Responses (application/json)\*\*

- \*\*201 Created\*\*

\```json

{ "message": "User created" }

409 Conflict

json

Копировать код

{ "error": "User already exists" }

POST /auth/login

Request Body (application/json)

username: string

password: string

Responses (application/json)

200 OK

json

Копировать код

{ "message": "Login successful" }

401 Unauthorized

json

Копировать код

{ "error": "Invalid username or password" }

GET /session

Authorization

Session cookie

Responses (application/json)

200 OK

json

Копировать код

{ "id": 1, "username": "demoUser" }

POST /auth/logout

Authorization

Session cookie

Responses (application/json)

200 OK

json

Копировать код

{ "message": "Logout successful" }

POST /tasks

Authorization

Session cookie

Request Body (application/json)

title: string

description: string

completed?: boolean

Responses (application/json)

201 Created

json

Копировать код

{

"id": 1,

"title": "Task title",

"description": "Some description",

"completed": false

}

GET /tasks

Authorization

Session cookie

Query Parameters

completed: boolean

Responses (application/json)

200 OK

json

Копировать код

[

{

"id": 1,

"title": "Task title",

"description": "Some description",

"completed": false

}

]

PUT /tasks/:id

Authorization

Session cookie

Request Body (application/json)

title?: string

description?: string

completed?: boolean

Responses (application/json)

200 OK

json

Копировать код

{

"id": 1,

"title": "Updated title",

"description": "Updated description",

"completed": true

}

404 Not Found

json

Копировать код

{ "error": "Task not found" }

DELETE /tasks/:id

Authorization

Session cookie

Responses (application/json)

200 OK

json

Копировать код

{ "message": "Task deleted" }

404 Not Found

json

Копировать код

{ "error": "Task not found" }

