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

  save(teacher: Teacher): Promise<Teacher> {
    return this.repo.save(teacher);
  }
}
