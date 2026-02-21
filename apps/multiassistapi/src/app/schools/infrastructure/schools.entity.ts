import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Address } from "../../addresses/infrastructure/addresses.entity";

@Entity('schools')
export class School extends BaseEntity{
  @Column()
  name: string;

  @OneToOne(() => Address, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  address: Address;
}
