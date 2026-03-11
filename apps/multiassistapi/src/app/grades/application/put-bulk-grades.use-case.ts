import { Injectable } from "@nestjs/common";
import { GradesRepository } from "../domain/grades.repository";
import { PutBulkGradesDto } from "../dto/put-bulk-grades.dto";

@Injectable()
export class PutBulkGradesUseCase {
  constructor(
    private readonly repo: GradesRepository
  ) {}

  async execute(dto: PutBulkGradesDto) {
    if (!dto.grades.length) throw new Error('No Grades Provided')

    await this.repo.putBulkGrades(dto)
    return {
      updated: dto.grades.length
    }
  }
}
