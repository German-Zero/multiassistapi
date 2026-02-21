import { Injectable } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";

@Injectable()
export class GetSchoolUseCase {
  constructor(
    private readonly repo: SchoolRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
