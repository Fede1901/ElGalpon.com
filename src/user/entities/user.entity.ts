import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { RoleType } from "../dto/user.dto";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column({type:"enum", enum: RoleType, nullable: false})
  role!: RoleType;

  @Column()
  dni!: number;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.user)
  purchases!: PurchaseEntity[];
  
}
