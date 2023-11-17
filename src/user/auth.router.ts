/* import { UserController } from "../user/controllers/user.controller";
import { BaseRouter } from "../shared/router/router";

export class AuthRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get("/auth/register", this.controller.renderRegister);
    this.router.get("/auth/login", this.controller.renderLogin);
    this.router.post("/auth/login", this.controller.login);
    this.router.post("/auth/register", this.controller.registerUser);
  }
}
 */