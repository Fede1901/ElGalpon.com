import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAllUser(): Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findUserById(id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de búsqueda");
    }
    const user = (await this.execRepository)
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("name like :search", { search: `%${search}%` })
      .orWhere("city like :search", { search: `%${search}%` })
      .orWhere("province like :search", { search: `%${search}%` })
      .getMany();

    return user;
  }

  async createUser(body: UserDTO): Promise<UserEntity> {
    // Hashea la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userToSave = { ...body, password: hashedPassword };
    return (await this.execRepository).save(userToSave);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

  async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }

  async authenticateUser(username: string, password: string): Promise<string | null> {
    const user = await (await this.execRepository).findOne({ where: { username } });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      // Crea y devuelve un token JWT si la autenticación es exitosa
      const token = jwt.sign({ userId: user.id, username: user.username }, "your-secret-key", { expiresIn: "1h" });
      return token;
    }
  
    return null;
  }
  
  async registerUser(userData: UserDTO): Promise<UserEntity> {
    // Verificar si el usuario ya existe por nombre de usuario o correo electrónico
    const existingUser = await (await this.execRepository).findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      throw new Error("El nombre de usuario o correo electrónico ya está en uso.");
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userToSave = { ...userData, password: hashedPassword };

    // Guardar el usuario en la base de datos
    const newUser = await (await this.execRepository).save(userToSave);

    return newUser;
  }

  async login(username: string, password: string): Promise<{ user: UserEntity; token: string }> {
    // Buscar al usuario por nombre de usuario
    const user = await (await this.execRepository).findOne({ where: { username } });

    // Verificar si el usuario existe y si la contraseña es válida
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generar un token JWT si la autenticación es exitosa
      const token = jwt.sign({ userId: user.id, username: user.username }, "your-secret-key", { expiresIn: "1h" });

      return { user, token };
    }

    throw new Error("Credenciales inválidas");
  }

}
