# 📝 Todo API Assignment

Учебное задание: REST API для управления списком задач (**todo list**) на **Node.js + Express**.  
Реализованы эндпоинты, валидация данных, обработка ошибок, Swagger-документация и коллекция Postman с автотестами.

---

## Запуск
```bash
git clone https://github.com/K4t3a/todo-assignment.git
cd todo-assignment
npm install
npm start
```
Сервер: http://localhost:3000

Документация Swagger: http://localhost:3000/docs

## 📌 Эндпоинты

## POST /auth/register

*Request Body:* `{"username": "string", "password": "string"}`  
*Responses:*  
`201: {"message": "User created"}`  
`409: {"error": "User already exists"}`

## POST /auth/login 
**POST /auth/login**  
*Request Body:* `{"username": "string", "password": "string"}`  
*Responses:*  
`200: {"message": "Login successful"}`  
`401: {"error": "Invalid username or password"}`

## GET /session 
**GET /session**  
*Authorization:* Session cookie  
*Response:*  
`200: {"id": 1, "username": "demoUser"}`

## POST /auth/logout
**POST /auth/logout**  
*Authorization:* Session cookie  
*Response:*  
`200: {"message": "Logout successful"}`

## POST /tasks 
**POST /tasks**  
*Authorization:* Session cookie  
*Request Body:* `{"title": "string", "description": "string", "completed": "boolean"}`  
*Response:*  
`201: {"id": 1, "title": "Task title", "description": "Some description", "completed": false}`

 ## GET /tasks 
**GET /tasks**  
*Authorization:* Session cookie  
*Query Parameters:* `completed: boolean`  
*Response:*  
`200: [{"id": 1, "title": "Task title", "description": "Some description", "completed": false}]`

## PUT /tasks/:id 
**PUT /tasks/:id**  
*Authorization:* Session cookie  
*Request Body:* `{"title": "string", "description": "string", "completed": "boolean"}`  
*Responses:*  
`200: {"id": 1, "title": "Updated title", "description": "Updated description", "completed": true}`  
`404: {"error": "Task not found"}`

## DELETE /tasks/:id 
**DELETE /tasks/:id**  
*Authorization:* Session cookie  
*Responses:*  
`200: {"message": "Task deleted"}`  
`404: {"error": "Task not found"}`
{ "error": "Task not found" }

