import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
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
    return (await this.execRepository).save(body);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  
  async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}