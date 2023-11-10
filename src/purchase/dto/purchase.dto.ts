import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class PurchaseDTO extends BaseDTO {
  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  paymentMethod!: string;
}
