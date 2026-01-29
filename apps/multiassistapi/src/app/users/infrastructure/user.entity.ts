import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  role: string;
}
