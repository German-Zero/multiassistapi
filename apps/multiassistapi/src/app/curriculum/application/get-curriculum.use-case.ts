import { Injectable } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";

@Injectable()
export class GetAllCurriculumUseCase {
  constructor(
    private readonly repo: CurriculumRepository,
  ) {}

  async execute() {
    return this.repo.findAll();
  }
}
