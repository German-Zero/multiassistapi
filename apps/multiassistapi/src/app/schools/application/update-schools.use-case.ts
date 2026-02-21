import { Injectable, NotFoundException } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";
import { UpdateSchoolDto } from "../dto/update-school.dto";

@Injectable()
export class UpdateSchoolUseCase {
  constructor(
    private readonly repo: SchoolRepository,
  ) {}

  async execute (id: number, dto: UpdateSchoolDto) {
    const school = await this.repo.findById(id);

    if (!school) {
      throw new NotFoundException('School Not Found');
    }

    if (dto.name) {
      school.name = dto.name;
    }

    if (dto.address) {
      Object.assign(school.address, dto.address);
    }

    return this.repo.update(school);
  }
}
