import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PurchaseProductEntity } from "./purchases-products.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
  @Column()
  status!: string;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => UserEntity, (user) => user.purchases)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct) => purchaseProduct.purchase
  )
  purchaseProduct!: PurchaseProductEntity[];
}