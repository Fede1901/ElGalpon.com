import { Router } from "express";

export class BaseRouter<T> {
  public router: Router;
  public controller: T;

  constructor(TController: new (dataSource?: any) => T) {
    this.router = Router();
    this.controller = new TController();
    this.routes();
  }

  routes() {}
}
