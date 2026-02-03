import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Shift } from "../../common/enums";
import { AcademicLevel } from "../../academic-level/infrastructure/academic-level.entity";
import { SchoolYear } from "../../school-year/infrastructure/schools-year.entity";

@Entity('divisions')
export class Division extends BaseEntity {

  @Column()
  letter: string;

  @Column({ type: 'enum', enum: Shift})
  shift: Shift;

  @ManyToOne(() => AcademicLevel)
  academicLevel: AcademicLevel;

  @ManyToOne(() => SchoolYear)
  schoolYear: SchoolYear;
}
