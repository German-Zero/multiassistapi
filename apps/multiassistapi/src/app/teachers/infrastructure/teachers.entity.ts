import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";

@Entity('teachers')
export class Teacher extends BaseEntity {

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Curriculum)
  curriculum: Curriculum;

  @ManyToOne(() => Division)
  division: Division;

  @Column()
  title: string;
}
