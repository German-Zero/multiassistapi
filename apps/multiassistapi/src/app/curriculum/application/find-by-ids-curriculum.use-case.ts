import { BadRequestException, Injectable } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { CurriculumResponseDto } from "../dto/res-curriculum.dto";

@Injectable()
export class FindCurriculumByIdsUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute(ids: number[]): Promise<CurriculumResponseDto[]> {
    if (!ids.length) throw new BadRequestException('Ids Required');

    const curriculums = await this.repo.findByIds(ids);

    return curriculums.map(c => ({
      id: c.id,
      weeklyHours: c.weeklyHours,
      subject: {
        name: c.subject.name,
      },
      division: {
        shift: c.division.shift,
        letter: c.division.letter,
        academicLevel: {
          name: c.division.academicLevel.name
        }
      },
    }));
  }
}
