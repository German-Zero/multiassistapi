import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { SchoolYear } from "../../school-year/infrastructure/schools-year.entity";

@Entity('school_calendar')
@Unique(['date', 'schoolYear'])
export class SchoolCalendar extends BaseEntity {
  @Column({ type: 'date', unique: true })
  date: string;

  @Column()
  isSchoolDay: boolean;

  @Column({ nullable: true })
  reason?: string;

  @ManyToOne(() => SchoolYear)
  schoolYear: SchoolYear;
}
