import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";
import { RoleType } from "../dto/user.dto";
import * as bcrypt from 'bcrypt';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async registerUser(userDTO: UserDTO): Promise<UserEntity> {
    // Obtener el repositorio de usuarios
    const userRepository = await this.execRepository;
    // Hashea la contraseña antes de almacenarla 
    const hashedPassword = await bcrypt.hash(userDTO.password, 10);
    // Crear la entidad del usuario a partir del DTO
    const userEntity = userRepository.create({
      name: userDTO.name,
      lastname: userDTO.lastname,
      username: userDTO.username,
      email: userDTO.email,
      password: hashedPassword,
      city: userDTO.city,
      province: userDTO.province,
      dni: userDTO.dni,
      role: RoleType.CUSTOMER,
    });
  
    // Guardar la entidad en la base de datos
    return userRepository.save(userEntity);
  }
  
  

  async authenticateUser(username: string, password: string): Promise<UserEntity | null> {
    // Obtener el repositorio de usuarios
    const userRepository = await this.execRepository;
  
    // Buscar al usuario por nombre de usuario
    const user = await userRepository.findOne({ where: { username }, select: ['password'] });
    console.log('Usuario encontrado:', user);
  
    // Verificar la contraseña si se encuentra el usuario
    if (user && user.password != null) {
      console.log('Contraseña recibida en el controlador:', password);
      console.log('Contraseña almacenada en la base de datos:', user.password);
  
      // Comparar la contraseña proporcionada con el hash almacenado
      const passwordsMatch = await bcrypt.compare(password, user.password);
  
      if (passwordsMatch) {
        console.log('Contraseñas coinciden');
        return user;
      } else {
        console.log('Contraseñas NO coinciden');
      }
    }
  
    return null;
  }
}
