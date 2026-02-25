import { Injectable } from "@nestjs/common";
import { DivisionRepository } from "../domain/division.repository";

@Injectable()
export class GetDivisionUseCase {
  constructor(
    private readonly repo: DivisionRepository,
  ) {}

  async execute() {
    return this.repo.findAll();
  }
}
