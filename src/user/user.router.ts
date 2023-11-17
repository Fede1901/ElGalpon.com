import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get("/register", (req, res) => this.controller.renderRegister(req, res));
    this.router.get("/login", (req, res) => this.controller.renderLogin(req, res));
    this.router.post("/register", (req, res) => this.controller.registerUser(req, res));
    this.router.post("/login", (req, res) => this.controller.login(req, res));
    this.router.get("7home", (req,res) => this.controller.renderHome(req,res));
  }
}

