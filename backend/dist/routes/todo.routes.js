"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/todo.routes.ts
const express_1 = require("express");
const todo_model_1 = __importDefault(require("../models/todo.model"));
const router = (0, express_1.Router)();
// Rota para criar uma nova tarefa
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        const newTodo = new todo_model_1.default({ task });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Rota para listar todas as tarefas
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_model_1.default.find();
        res.json(todos);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Rota para atualizar uma tarefa existente
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, completed } = req.body;
        const updatedTodo = yield todo_model_1.default.findByIdAndUpdate(id, { task, completed }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        res.json(updatedTodo);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
// Rota para deletar uma tarefa existente
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield todo_model_1.default.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Tarefa não encontrada" });
        }
        res.json(deletedTodo);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
exports.default = router;
