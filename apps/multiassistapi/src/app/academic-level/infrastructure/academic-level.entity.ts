import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Entity('academic_levels')
export class AcademicLevel extends BaseEntity {

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Division, division => division.academicLevel)
  divisions: Division[]
}
