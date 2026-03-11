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
      subject: {
        name: t.curriculum.subject.name,
      },
      division: {
        id: t.curriculum.division.id,
        shift: t.curriculum.division.shift,
        letter: t.curriculum.division.letter,
        academicLevel: {
          name: t.curriculum.division.academicLevel.name
        }
      }
    }))
  }
}
