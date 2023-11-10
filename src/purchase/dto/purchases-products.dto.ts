import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class PurchaseProductDTO extends BaseDTO {
  @IsNotEmpty()
  @IsNumber()
  quantityProduct!: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number;
}

