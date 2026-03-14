import { Controller, Get } from "@nestjs/common";
import { GetDivisionUseCase } from "../application/get-division.use-case";
import { GetDivisionsWithStudentsUseCase } from "../application/get-division-with-student.use-case";

@Controller('divisions')
export class DivisionsController {
  constructor(
    private readonly getDivisionUseCase: GetDivisionUseCase,
    private readonly getDivisionWithStudentUseCase: GetDivisionsWithStudentsUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getDivisionUseCase.execute();
  }

  @Get('with-students')
  getDivisionsWithStudents() {
  return this.getDivisionWithStudentUseCase.execute();
}
}
