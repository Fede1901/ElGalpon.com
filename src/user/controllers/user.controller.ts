import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.findAllUser();
      if (users.length === 0) {
        return this.httpResponse.NotFound(res, "No existe el dato");
      }
      // this.httpResponse.Ok(res, users);
      res.render("users", { users });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }



  async getUserById(req: Request, res: Response) {
    let { id } = req.query;
    id = id?.toString() || "";

    try {
      const data = await this.userService.findUserById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe dato");
      }
      // return this.httpResponse.Ok(res, data);
      return res.render("edit", {
        user: data,
      });
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      // return this.httpResponse.Ok(res, data);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async search(req: Request, res: Response) {
    let { search } = req.query;
    search = search?.toString() || "";


    try {
      const users = await this.userService.search(search);
      res.render("search", {
        users: users,
        search: search
      });
    } catch (err) {
      res.render("message", {
        message: `Error al buscar el usuario:`
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: UpdateResult = await this.userService.updateUser(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al actualizar");
      }
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
  async deleteUser(req: Request, res: Response) {
    // const { id } = req.params;
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      // return this.httpResponse.Ok(res, data);
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

}
