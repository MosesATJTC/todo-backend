import { NextFunction, Request, Response, Router } from "express";
import { BaseController } from "./base-controller";
import { AppContext, ExtendedRequest } from "@typings";
import TodoModal from "../storage/mongoose/todo";
import { async } from "crypto-random-string";

class Todo {
  title:string
  constructor(name:string){
    this.title = name
  }
}

export class TodoController extends BaseController {
  public basePath: string = "/todo";
  public router: Router = Router();

  constructor(ctx: AppContext) {
    super(ctx);
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(this.basePath, this.getAllTodos);
    this.router.get(`${this.basePath}/:id`, this.getTodoById);
    this.router.put(`${this.basePath}/:id`, this.updateTodo);
    this.router.post(this.basePath, this.createTodo);
    this.router.delete(`${this.basePath}/:id`, this.deleteTodo);
  }
  // Get all todo 
  private getAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const alltodos = await TodoModal.find({}).lean();
    res.status(200).json({ allTodos: alltodos });
  };
  // Get the todo by quearing id
  private getTodoById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const todoItem = await TodoModal.findById(req.params.id).exec()
    res.status(200).json(todoItem) 
  };
  // Create todo
  private createTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const title = await TodoModal.create(new Todo(req.body.title));
    res.status(201).json({ title: req.body.title, id: title._id });
  };
  // Update todo
  private updateTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const updateTodoitem = await TodoModal.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(200).json({ id: req.params.id, title: req.body.title });
  };
  //Delete todo
  private deleteTodo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const deleteTodo = await TodoModal.deleteOne({ _id: req.params.id });
    res.status(204);
  };
}
