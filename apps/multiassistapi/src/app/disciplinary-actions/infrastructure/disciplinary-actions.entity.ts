import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { User } from "../../users/infrastructure/user.entity";

@Entity('disciplinary_actions')
export class DiscilpinaryAction extends BaseEntity {

  @ManyToOne(() => Student)
  student: Student;

  @Column('text')
  reason: string;

  @Column()
  severity: number;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => User)
  issuedBy: User
}
