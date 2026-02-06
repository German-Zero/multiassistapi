import { Injectable } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";

@Injectable()
export class GetSchoolUseCase {
  constructor(
    private readonly schoolRepository: SchoolRepository,
  ) {}

  execute() {
    return this.schoolRepository.findAll();
  }
}
