import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AssignDivisionUseCase } from "../application/assign-division.use-case";
import { AssignDivisionDto } from "../dto/assign-division.dto";
import { GetStudentsByDivisionUseCase } from "../application/get-student-by-division.use-case";
import { GetStudentsGradesByCurriculumUseCase } from "../application/get-students-grades-by-curriculum.usecase";

@Controller('students')
export class StudentsController {
  constructor(
    private readonly assignDivisionUseCase: AssignDivisionUseCase,
    private readonly StudentByDivisionUseCase: GetStudentsByDivisionUseCase,
    private readonly getStudentsGradesUseCase: GetStudentsGradesByCurriculumUseCase,
  ) {}

  @Post('assign-division')
  assignDivision(@Body() dto: AssignDivisionDto) {
    return this.assignDivisionUseCase.execute(dto);
  }

  @Get('division/:divisionId')
  getByDivision(
    @Param('divisionId', ParseIntPipe) divisionId: number,
  ) {
    return this.StudentByDivisionUseCase.execute(divisionId)
  }

  @Get("curriculum/:curriculumId")
  getStudentsGrades(@Param("curriculumId") curriculumId: number) {
    return this.getStudentsGradesUseCase.execute(Number(curriculumId));
  }
}
