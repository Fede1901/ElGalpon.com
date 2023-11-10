import express from "express";
import { UserController } from "../user/controllers/user.controller"; 

export class AuthRouter {
  public router: express.Router = express.Router();
  private readonly controller: UserController = new UserController(); 

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", this.controller.login); // Agrega la ruta de inicio de sesión
    this.router.post("/register", this.controller.registerUser); // Agrega la ruta de registro
  }
}
