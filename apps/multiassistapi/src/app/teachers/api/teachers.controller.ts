import { Body, Controller, Post } from "@nestjs/common";
import { CreateTeacherDto } from "../dto/create-teacher.dto";
import { CreateTeacherUseCase } from "../application/create-teacher.use-case";

@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly createTeacherUseCase: CreateTeacherUseCase,
  ) {}

  @Post()
  save(@Body() dto: CreateTeacherDto) {
    return this.createTeacherUseCase.execute(dto);
  }
}
