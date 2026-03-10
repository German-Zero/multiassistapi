import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";

@Entity('recovery_exams')
export class RecoveryExam extends BaseEntity {
  @ManyToOne(() => Student)
  student: Student;

  @ManyToOne(() => Curriculum)
  curriculum: Curriculum;

  @Column('decimal', { precision: 4, scale: 2 })
  value: number;
}
