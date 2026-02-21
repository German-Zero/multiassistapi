import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  provincia: string;

  @Column()
  ciudad: string;

  @Column()
  calle: string;

  @Column()
  postCode: string;
}
