import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Shift } from "../../common/enums";
import { AcademicLevel } from "../../academic-level/infrastructure/academic-level.entity";
import { Student } from "../../students/infrastructure/students.entity";

@Entity('divisions')
export class Division extends BaseEntity {

  @Column()
  letter: string;

  @Column({ type: 'enum', enum: Shift})
  shift: Shift;

  @ManyToOne(() => AcademicLevel)
  academicLevel: AcademicLevel;

  @OneToMany(() => Student, student => student.division)
  students: Student[]
}
