import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { School } from "../../schools/infrastructure/schools.entity";
import { Role } from "../../roles/infrastructure/roles.entity";

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastname: string;

  @Column()
  displayName: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  password: string;

  @Column({ default: false })
  passwordChanged: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @ManyToOne(() => School)
  school: School;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
