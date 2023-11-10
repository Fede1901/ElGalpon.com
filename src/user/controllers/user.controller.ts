import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";
import * as jwt from "jsonwebtoken";
import { UserEntity } from "../entities/user.entity";


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
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      const userData = req.body;

      // Validar datos de usuario
      // ...

      // Llama al método registerUser en el servicio para manejar la lógica específica del registro
      const newUser = await this.userService.registerUser(userData);

      // Generar un token de sesión
      const token = this.generateAuthToken(newUser);

      return res.json({ message: 'Usuario registrado exitosamente', user: newUser, token });
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
    const { id } = req.body;

    try {
      const data: DeleteResult = await this.userService.deleteUser(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error al eliminar");
      }
      res.render("index");
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }

  // Método para generar un token de sesión
  private generateAuthToken(user: UserEntity): string {
    const token = jwt.sign({ id: user.id, username: user.username }, 'your-secret-key', {
      expiresIn: '1h', // Cambia según tus necesidades
    });
    return token;
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      // Llama al método login en el servicio para manejar la lógica de inicio de sesión
      const { user, token } = await this.userService.login(username, password);

      return res.json({ message: 'Inicio de sesión exitoso', user, token });
    } catch (e) {
      return this.httpResponse.Error(res, e);
    }
  }
}
