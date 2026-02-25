import { Injectable } from "@nestjs/common";
import { TeacherRepository } from "../domain/teacher.repository";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { Teacher } from "../infrastructure/teachers.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";
@Injectable()
export class CreateTeacherUseCase {
  constructor(
    private readonly teacherRepo: TeacherRepository,
  ) {}

  async execute(dto: CreateTeacherDto) {


    const teacher = new Teacher();
    teacher.title = dto.title;
    teacher.user = { id: dto.userId } as User;
    teacher.curriculum = { id: dto.curriculumId } as Curriculum;
    teacher.division = { id: dto.divisionId } as Division;

    console.log("Creating teacher with data:", teacher);
    console.log("Creating teacher with data:", dto);

    return await this.teacherRepo.save(teacher);
  }
}
