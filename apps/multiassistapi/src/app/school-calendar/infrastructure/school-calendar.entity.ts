import { Column, Entity, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('school_calendar')
@Unique(['date'])
export class SchoolCalendar extends BaseEntity {
  @Column({ type: 'date', unique: true })
  date: string;

  @Column()
  isSchoolDay: boolean;

  @Column({ nullable: true })
  reason?: string;
}
