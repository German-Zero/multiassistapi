import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Address } from "../../addresses/infrastructure/addresses.entity";

@Entity('schools')
export class School extends BaseEntity{
  @Column()
  name: string;

  @ManyToOne(() => Address, { cascade: true })
  address: Address;
}
