// src/models/todo.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  task: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
