import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { TeacherRepository } from "../domain/teacher.repository";
import { CurriculumRepository } from "../../curriculum/domain/curriculum.repository";
import { UserRepository } from "../../users/domain/user.repository";
import { ReassignTeacherDto } from "../dto/reassign-teacher.dto";
import { Teacher } from "../infrastructure/teachers.entity";

@Injectable()
export class ReassignTeacherUseCase {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly curriculumRepo: CurriculumRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: ReassignTeacherDto) {

    const user = await this.userRepo.findById(dto.userId);

    if (!user) throw new NotFoundException('User Not Found');

    if (!dto.curriculumIds.length) throw new BadRequestException('Curriculum Required')

      const curriculums = await this.curriculumRepo.findByIds(dto.curriculumIds);

      if (curriculums.length !== dto.curriculumIds.length)
        throw new BadRequestException('Some Curriculum Not Found');

      await this.teacherRepo.deleteByUserId(dto.userId);
      const teachers = curriculums.map(curriculum => {
        const teacher = new Teacher();
        teacher.user = user;
        teacher.curriculum = curriculum;
        teacher.title = dto.title;
        return teacher;
      });

      return this.teacherRepo.createMany(teachers)
  }
}
