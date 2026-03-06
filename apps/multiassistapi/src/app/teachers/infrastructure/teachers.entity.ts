import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";

@Unique(['user', 'curriculum'])
@Entity('teachers')
export class Teacher extends BaseEntity {

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Curriculum)
  curriculum: Curriculum;

  @Column()
  title: string;
}
