import { Body, Controller, Post } from "@nestjs/common";
import { AssignDivisionUseCase } from "../application/assign-division.use-case";
import { AssignDivisionDto } from "../dto/assign-division.dto";

@Controller('students')
export class StudentsController {
  constructor(
    private readonly assignDivisionUseCase: AssignDivisionUseCase,
  ) {}

  @Post('assign-division')
  assignDivision(@Body() dto: AssignDivisionDto) {
    return this.assignDivisionUseCase.execute(dto);
  }
}
