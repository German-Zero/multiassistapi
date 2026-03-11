import { Injectable } from "@nestjs/common";
import { TeacherRepository } from "../domain/teacher.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./teachers.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeacherRepositoryImpl implements TeacherRepository {
  constructor(

    @InjectRepository(Teacher)
    private readonly repo: Repository<Teacher>,

  ) {}

  createMany(teachers: Teacher[]): Promise<Teacher[]> {
    return this.repo.save(teachers)
  }

  async deleteByUserId(userId: number): Promise<void> {
    await this.repo.delete({
      user: { id: userId }
    })
  }

  findByUserId(userId: number): Promise<Teacher[]> {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['curriculum'],
    });
  }

  findCurriculumByUserId(userId: number): Promise<Teacher[]> {
    return this.repo.find({
      where: {
        user: { id: userId },
      },
      relations: [
        'curriculum',
        'curriculum.subject',
        'curriculum.division',
        'curriculum.division.academicLevel',
      ]
    })
  }
}
