import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TeacherRepository } from "../domain/teacher.repository";
import { UserRepository } from "../../users/domain/user.repository";
import { AssignTeacherDto } from "../dto/assign-teacher.dto";
import { Teacher } from "../infrastructure/teachers.entity";
import { CurriculumRepository } from "../../curriculum/domain/curriculum.repository";

@Injectable()
export class AssignTeacherToCurriculumUseCase {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly useRepo: UserRepository,
    private readonly curriculumRepo: CurriculumRepository,
  ) {}
  async execute(dto: AssignTeacherDto) {
    const user = await this.useRepo.findById(dto.userId);

    if (!user) throw new NotFoundException('User Not Found');

    const curriculums = await this.curriculumRepo.findByIds(dto.curriculumIds);

    if (curriculums.length !== dto.curriculumIds.length) throw new BadRequestException('Some Curriculum Not Found');

    const teachers = curriculums.map(curriculum => {
      const teacher = new Teacher();
      teacher.user = user;
      teacher.curriculum = curriculum;
      teacher.title = dto.title;
      return teacher
    });

    return this.teacherRepo.createMany(teachers)
  }
}
