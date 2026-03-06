import { Injectable } from "@nestjs/common";
import { TeacherRepository } from "../domain/teacher.repository";
import { TeacherCurriculumDto } from "../dto/teacher-curriculum.dto";

@Injectable()
export class GetAcademyByTeacherUseCase {
  constructor(
    private readonly repo: TeacherRepository,
  ) {}

  async execute(userId: number): Promise<TeacherCurriculumDto[]> {

    const teacherAssignments = await this.repo.findCurriculumByUserId(userId);

    if (!teacherAssignments.length) {
      return [];
    }

    return teacherAssignments.map(t => ({
      curriculumId: t.curriculum.id,
      weeklyHours: t.curriculum.weeklyHours,
      subjectName: t.curriculum.subject.name,
      academicLevelName: t.curriculum.academicLevel.name,
      division: {
        shift: t.curriculum.division.shift,
        letter: t.curriculum.division.letter,
      }
    }))
  }
}
