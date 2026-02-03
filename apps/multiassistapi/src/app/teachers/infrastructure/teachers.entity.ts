import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";

@Entity('teachers')
export class Teacher extends BaseEntity {

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  title: string;
}
