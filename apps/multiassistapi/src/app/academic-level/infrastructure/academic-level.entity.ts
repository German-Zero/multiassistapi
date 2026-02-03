import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('academic_levels')
export class AcademicLevel extends BaseEntity {

  @Column({ unique: true })
  name: string;
}
