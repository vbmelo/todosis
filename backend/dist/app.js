"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.use("/todos", todo_routes_1.default);
// Chamando a função de conexão ao banco de dados
(0, dbConnect_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
