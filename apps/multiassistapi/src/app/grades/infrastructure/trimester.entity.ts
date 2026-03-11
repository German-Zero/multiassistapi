import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('trimesters')
export class Trimester extends BaseEntity {
  @Column()
  number: number;

  @Column({ type: 'date' })
  date: Date;
}
