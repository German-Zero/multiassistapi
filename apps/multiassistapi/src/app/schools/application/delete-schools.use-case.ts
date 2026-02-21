import { Injectable, NotFoundException } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";

@Injectable()
export class DeleteSchoolUseCase {
  constructor(
    private readonly repo: SchoolRepository,
  ) {}

  async execute(id: number) {
    const school = await this.repo.findById(id);

    if (!school) {
      throw new NotFoundException('School Not Found');
    }

    await this.repo.remove(school);
  }
}
