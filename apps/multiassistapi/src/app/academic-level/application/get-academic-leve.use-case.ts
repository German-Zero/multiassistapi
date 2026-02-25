import { Injectable } from "@nestjs/common";
import { AcademicLevelRepository } from "../domain/academic-level.repository";

@Injectable()
export class GetAcademicLevelUseCase {
  constructor(
    private readonly repo: AcademicLevelRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
