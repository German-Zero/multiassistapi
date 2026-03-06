import { Controller, Get } from "@nestjs/common";
import { FindAllCurriculumUseCase } from "../application/find-all-curriculum.use-case";

@Controller('curriculum')
export class CurriculumController {
  constructor(
    private readonly findAllUseCase: FindAllCurriculumUseCase,
  ) {}

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }
}
