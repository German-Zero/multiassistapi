import { Controller, Get } from "@nestjs/common";
import { GetAcademicLevelUseCase } from "../application/get-academic-leve.use-case";

@Controller('academic-levels')
export class AcademicLevelController {
  constructor(
    private readonly getAcademicLevel: GetAcademicLevelUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getAcademicLevel.execute();
  }
}
