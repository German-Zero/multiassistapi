import { Injectable } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";
import { CreateSchoolDto } from "../dto/create-school.dto";
import { SchoolFactory } from "../domain/school.factory";

@Injectable()
export class CreateSchoolUseCase {
  constructor (private readonly repo: SchoolRepository) {}

  execute(dto: CreateSchoolDto) {
    const school = SchoolFactory.create(dto);
    return this.repo.create(school);
  }
}
