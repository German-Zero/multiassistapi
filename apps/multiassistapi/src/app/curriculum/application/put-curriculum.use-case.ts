import { Injectable, NotFoundException } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { PutCurriculumDto } from "../dto/put-curriculum.dto";
import { Subject } from "../../subjects/infrastructure/subjects.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Injectable()
export class PutCurriculumUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute(id: number, dto: PutCurriculumDto) {
    const curriculum = await this.repo.findById(id)

    if (!curriculum) throw new NotFoundException('Curriculum Not Found');

    if (dto.subjectId) curriculum.subject = { id: dto.subjectId } as Subject;
    if (dto.divisionId) curriculum.division = { id: dto.divisionId } as Division;
    if (dto.weeklyHours) curriculum.weeklyHours = dto.weeklyHours;

    return this.repo.save(curriculum)
  }
}
