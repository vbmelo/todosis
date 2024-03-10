// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo.routes";
import connectDB from "./config/dbConnect";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/todos", todoRoutes);

// Chamando a função de conexão ao banco de dados
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Failed to connect to MongoDB:", err);
  });
