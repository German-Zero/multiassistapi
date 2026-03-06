import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { AttendanceStatus } from "../../common/enums";
import { User } from "../../users/infrastructure/user.entity";
import { AttendanceDay } from "./attendance-day.entity";

@Entity('attendances')
@Unique(['student', 'attendanceDay'])
export class Attendance extends BaseEntity {

  @ManyToOne(() => Student, { eager: false })
  student: Student;

  @ManyToOne(() => AttendanceDay, day => day.attendances, { eager: false })
  attendanceDay: AttendanceDay;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
  })
  status: AttendanceStatus;

  @ManyToOne(() => User, { nullable: true })
  recorderBy: User;

  @Column({ nullable: true })
  justification: string;
}
