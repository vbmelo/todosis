// src/routes/todo.routes.ts
import { Router, Request, Response } from "express";
import Todo from "../models/todo.model";

const router: Router = Router();

// Rota para criar uma nova tarefa
router.post("/", async (req: Request, res: Response) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para listar todas as tarefas
router.get("/", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para atualizar uma tarefa existente
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { task, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, completed },
      { new: true },
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(updatedTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para deletar uma tarefa existente
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }
    res.json(deletedTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
