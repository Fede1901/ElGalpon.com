import { IsNotEmpty, IsNumber} from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;

  @IsNotEmpty()
  @IsNumber()
  dni!:number;
}

export enum RoleType {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}