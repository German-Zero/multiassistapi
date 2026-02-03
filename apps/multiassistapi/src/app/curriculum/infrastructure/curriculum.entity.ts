import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Subject } from "../../subjects/infrastructure/subjects.entity";
import { AcademicLevel } from "../../academic-level/infrastructure/academic-level.entity";

@Entity('curriculum')
export class Curriculum extends BaseEntity {
@ManyToOne(() => Subject)
subject: Subject;

@ManyToOne(() => AcademicLevel)
academicLevel: AcademicLevel;

@Column()
weeklyHours: number;
}
