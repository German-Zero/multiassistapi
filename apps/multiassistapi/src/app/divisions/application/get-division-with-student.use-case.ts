import { Injectable } from "@nestjs/common";
import { DivisionRepository } from "../domain/division.repository";
import { DivisionWithStudentCountDto } from "../dto/division-with-student-count.dto";

@Injectable()
export class GetDivisionsWithStudentsUseCase {

  constructor(
    private readonly repo: DivisionRepository
  ) {}

  async execute(): Promise<DivisionWithStudentCountDto[]> {

    const rows = await this.repo.findDivisionsWithStudents();

    return rows.map(row => ({
      id: row.id,
      letter: row.letter,
      shift: row.shift,
      academicLevel: row.academicLevelName,
      studentCount: Number(row.studentCount)
    }));

  }
}
