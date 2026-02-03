import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { AttendanceStatus } from "../../common/enums";
import { User } from "../../users/infrastructure/user.entity";

@Entity('attendance')
@Unique(['student', 'date'])
export class Attendance extends BaseEntity {

  @ManyToOne(() => Student)
  student: Student;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'enum', enum: AttendanceStatus })
  status: AttendanceStatus;

  @Column({ nullable: true })
  justification?: string;

  @ManyToOne(() => User)
  recordedBy: User;
}
