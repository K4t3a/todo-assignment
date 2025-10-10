import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { body, param, query, validationResult } from "express-validator";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load("./openapi.yaml");

let nextId = 1;
const tasks = new Map(); 

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Healthcheck
app.get("/", (req, res) => {
  res.json({ status: "ok", name: "todo-api", version: "1.0.0" });
});

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

// Хелпер валидации
function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "ValidationError",
      details: errors.array().map(e => ({
        field: e.path || e.param,
        message: e.msg,
        location: e.location
      }))
    });
  }
  next();
}

/** Создание задачи: POST /tasks */
app.post(
  "/tasks",
  [
    body("title").isString().trim().notEmpty().withMessage("title is required and must be a non-empty string"),
    body("description").optional().isString().withMessage("description must be a string"),
    body("completed").optional().isBoolean().withMessage("completed must be a boolean"),
  ],
  handleValidation,
  (req, res) => {
    const { title, description = "", completed = false } = req.body;
    const now = new Date().toISOString();
    const task = { id: nextId++, title, description, completed: Boolean(completed), createdAt: now, updatedAt: now };
    tasks.set(task.id, task);
    res.status(201).json(task);
  }
);

/** Список: GET /tasks?completed=true|false */
app.get(
  "/tasks",
  [ query("completed").optional().isBoolean().withMessage("completed must be boolean (true/false)") ],
  handleValidation,
  (req, res) => {
    let list = Array.from(tasks.values());
    if (typeof req.query.completed !== "undefined") {
      const flag = req.query.completed === "true";
      list = list.filter(t => t.completed === flag);
    }
    res.json(list);
  }
);

/** Получение одной: GET /tasks/:id */
app.get(
  "/tasks/:id",
  [ param("id").isInt({ min: 1 }).withMessage("id must be a positive integer") ],
  handleValidation,
  (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.get(id);
    if (!task) {
      return res.status(404).json({ error: "NotFound", message: `Task ${id} not found` });
    }
    res.json(task);
  }
);

/** Обновление: PUT /tasks/:id (все поля опциональны) */
app.put(
  "/tasks/:id",
  [
    param("id").isInt({ min: 1 }).withMessage("id must be a positive integer"),
    body("title").optional().isString().trim().notEmpty().withMessage("title must be non-empty string"),
    body("description").optional().isString().withMessage("description must be a string"),
    body("completed").optional().isBoolean().withMessage("completed must be a boolean")
  ],
  handleValidation,
  (req, res) => {
    const id = Number(req.params.id);
    const exists = tasks.get(id);
    if (!exists) {
      return res.status(404).json({ error: "NotFound", message: `Task ${id} not found` });
    }
    const { title, description, completed } = req.body;
    if (typeof title === "undefined" && typeof description === "undefined" && typeof completed === "undefined") {
      return res.status(400).json({ error: "ValidationError", message: "At least one of title, description, completed must be provided" });
    }
    const updated = { ...exists };
    if (typeof title !== "undefined") updated.title = title;
    if (typeof description !== "undefined") updated.description = description;
    if (typeof completed !== "undefined") updated.completed = Boolean(completed);
    updated.updatedAt = new Date().toISOString();
    tasks.set(id, updated);
    res.json(updated);
  }
);

/** Удаление: DELETE /tasks/:id */
app.delete(
  "/tasks/:id",
  [ param("id").isInt({ min: 1 }).withMessage("id must be a positive integer") ],
  handleValidation,
  (req, res) => {
    const id = Number(req.params.id);
    if (!tasks.has(id)) {
      return res.status(404).json({ error: "NotFound", message: `Task ${id} not found` });
    }
    tasks.delete(id);
    res.status(204).send();
  }
);

// 404 для неизвестных маршрутов
app.use((req, res) => {
  res.status(404).json({ error: "NotFound", message: "Route not found" });
});

// Централизованный обработчик 500
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "InternalServerError", message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Todo API listening on http://localhost:${PORT} (docs at /docs)`);
});
