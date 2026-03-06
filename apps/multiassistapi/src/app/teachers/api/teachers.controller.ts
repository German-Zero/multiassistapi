import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { AssignTeacherToCurriculumUseCase } from "../application/assign-teacher.use-case";
import { AssignTeacherDto } from "../dto/assign-teacher.dto";
import { ReassignTeacherDto } from "../dto/reassign-teacher.dto";
import { ReassignTeacherUseCase } from "../application/reassign-teacher.use-case";
import { GetAcademyByTeacherUseCase } from "../application/get-academy-by-teacher.use-case";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly assignTeacherUseCase: AssignTeacherToCurriculumUseCase,
    private readonly reassignTeacherUseCase: ReassignTeacherUseCase,
    private readonly getCurriculumTeacherUseCase: GetAcademyByTeacherUseCase,
  ) {}

  @Post()
  save(@Body() dto: AssignTeacherDto) {
    return this.assignTeacherUseCase.execute(dto);
  }

  @Put('reassign')
  reassign(@Body() dto: ReassignTeacherDto) {
    return this.reassignTeacherUseCase.execute(dto)
  }

  @Get(':id')
  getByTeacher(@Param('id') id: number) {
    return this.getCurriculumTeacherUseCase.execute(id)
  }
}
