import { Injectable } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { CurriculumResponseDto } from "../dto/res-curriculum.dto";

@Injectable()
export class FindAllCurriculumUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute(): Promise<CurriculumResponseDto[]> {
    const curriculums = await this.repo.findAll();

    return curriculums.map(c => ({
      id: c.id,
      weeklyHours: c.weeklyHours,
      subjectName: c.subject.name,
      academicLevelName: c.academicLevel.name,
      division: {
        shift: c.division.shift,
        letter: c.division.letter,
      },
    }));
  }
}
