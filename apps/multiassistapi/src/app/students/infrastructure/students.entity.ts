import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Entity('students')
export class Student extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  legajo: string;

  @ManyToOne(() => Division)
  division: Division;
}
