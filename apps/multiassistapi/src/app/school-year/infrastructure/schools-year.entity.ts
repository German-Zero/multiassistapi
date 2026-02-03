import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { School } from "../../schools/infrastructure/schools.entity";

@Entity('school_years')
export class SchoolYear extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: string

  @Column({ type: 'date' })
  endDate: string;

  @ManyToOne(() => School)
  school: School;
}
