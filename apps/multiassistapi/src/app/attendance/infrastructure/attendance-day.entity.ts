import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";
import { Attendance } from "./attendance.entity";

@Entity('attendance_day')
@Unique(['date', 'division'])
export class AttendanceDay extends BaseEntity {
  @Column({ type: 'date' })
  date: string;

  @Column({ default: true })
  isOpen: boolean;

  @ManyToOne(() => Division)
  division: Division;

  @ManyToOne(() => User, { nullable: true })
  openedBy: User;

  @ManyToOne(() => User, { nullable: true })
  closedBy: User;

  @OneToMany(() => Attendance, attendance => attendance.attendanceDay)
  attendances: Attendance[];
}
