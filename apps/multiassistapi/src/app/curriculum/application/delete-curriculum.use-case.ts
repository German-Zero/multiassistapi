import { Injectable, NotFoundException } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";

@Injectable()
export class DeleteCurriculumUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute(id: number) {
    const curriculum = await this.repo.findById(id);

    if (!curriculum) throw new NotFoundException('Curriculum Not Found')

    await this.repo.delete(id)

    return { deleted: true }
  }
}
