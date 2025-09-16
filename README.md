# 📝 Todo API Assignment

Учебное задание: REST API для управления списком задач (**todo list**) на **Node.js + Express**.  
Реализованы эндпоинты, валидация данных, обработка ошибок, Swagger-документация и коллекция Postman с автотестами.

---

## 🚀 Запуск
```bash
git clone https://github.com/username/todo-assignment.git
cd todo-assignment
npm install
npm start
```
Сервер: http://localhost:3000

Документация Swagger: http://localhost:3000/docs

## 📌 Эндпоинты
```bash
POST /tasks — создать задачу

GET /tasks — список задач (?completed=true|false)

GET /tasks/:id — получить задачу

PUT /tasks/:id — обновить

DELETE /tasks/:id — удалить
```
