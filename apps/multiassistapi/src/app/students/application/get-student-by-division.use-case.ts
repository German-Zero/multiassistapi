import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../domain/student.repository";
import { Student } from "../infrastructure/students.entity";

@Injectable()
export class GetStudentsByDivisionUseCase {
  constructor(
    private readonly repo: StudentRepository,
  ) {}

  async execute(divisionId: number): Promise<Student[]> {
    return this.repo.findByDivision(divisionId);
  }
}
