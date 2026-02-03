import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";
import { Teacher } from "../../teachers/infrastructure/teachers.entity";
import { GradeType } from "../../common/enums";
import { SchoolYear } from "../../school-year/infrastructure/schools-year.entity";

@Entity('grades')
export class Grade extends BaseEntity {
  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Curriculum)
  curriculum: Curriculum;

  @ManyToOne(() => Teacher)
  teacher: Teacher;

  @Column('decimal', { precision: 4, scale: 2 })
  value: number;

  @Column({ type: 'enum', enum: GradeType })
  type: GradeType;

  @Column({ type: 'date' })
  date: string;

  @ManyToOne(() => SchoolYear)
  schoolYear: SchoolYear;
}
