import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../domain/student.repository";

@Injectable()
export class GetStudentUseCase {
  constructor(
    private readonly repo: StudentRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
