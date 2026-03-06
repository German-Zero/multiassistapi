import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { RoleEnum } from "../../common/enums";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  save(user: User) {
    return this.repo.save(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  findById(id: number): Promise<User | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['roles'],
    })
  }

  findByRole(roleName: string): Promise<User[]> {
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('role.name = :roleName', { roleName })
      .andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('COUNT(r.id)')
          .from('user_roles', 'ur')
          .innerJoin('roles', 'r', 'ur.rolesId = r.id')
          .where('ur.usersId = user.id')
          .getQuery();

        return `(${subQuery}) > 0`;
      })
      .getMany();
  }

  async findUnassignedStudent(): Promise<User[]> {

    return this.repo
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin(Student, 'student', 'student.user_id = user.id')
      .where('role.name = :roleName', { roleName: RoleEnum.ALUMNO })
      .andWhere('student.id IS NULL')
      .select([
        'user.id',
        'user.name',
        'user.lastname',
        'user.displayName',
        'user.email',
        'user.dni',
      ])
      .getMany();
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  update(user: User): Promise<User> {
    return this.repo.save(user);
  }

  remove(user: User) {
    return this.repo.remove(user);
  }
}
