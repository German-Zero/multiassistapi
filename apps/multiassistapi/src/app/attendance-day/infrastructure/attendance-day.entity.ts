import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";

@Entity('attendance_day')
export class AttendanceDay extends BaseEntity {
  @Column({ type: 'date', unique: true })
  date: string;

  @Column()
  isOpen: boolean;

  @ManyToOne(() => User)
  closedBy: User;
}
