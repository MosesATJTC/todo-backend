import { model, Schema } from "mongoose";

const todoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const todo = model("Todo", todoSchema);
export default todo;
