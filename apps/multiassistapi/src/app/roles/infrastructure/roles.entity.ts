import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { RoleEnum } from "../../common/enums";

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true, type: 'enum', enum: RoleEnum })
  name: RoleEnum
}
