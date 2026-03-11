import { Injectable } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { PostCurriculumDto } from "../dto/post-curriculum.dto";
import { Curriculum } from "../infrastructure/curriculum.entity";
import { Subject } from "../../subjects/infrastructure/subjects.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Injectable()
export class PostCurriculumUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute(dto: PostCurriculumDto) {
    const curriculum = new Curriculum();

    curriculum.subject = { id: dto.subjectId } as Subject;
    curriculum.division = { id: dto.divisionId } as Division;

    curriculum.weeklyHours = dto.weeklyHours;

    return this.repo.save(curriculum)
  }
}
