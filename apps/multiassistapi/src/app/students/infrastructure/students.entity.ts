import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Entity('students')
export class Student extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Division)
  @JoinColumn({ name: 'division_id' })
  division: Division;
}
