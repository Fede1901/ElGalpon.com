import { IsString, IsNumber } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class ProductDTO extends BaseDTO {
  @IsString()
  productName: string = "";

  @IsString()
  description: string = "";

  @IsNumber()
  price: number = 0;

}
