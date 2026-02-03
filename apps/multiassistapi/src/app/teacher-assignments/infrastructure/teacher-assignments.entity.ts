import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Teacher } from "../../teachers/infrastructure/teachers.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Entity('teacher_assignments')
export class TeacherAssignment extends BaseEntity {

  @ManyToOne(() => Teacher)
  teacher: Teacher;

  @ManyToOne(() => Curriculum)
  curriculum: Curriculum;

  @ManyToOne(() => Division)
  division: Division;
}
