import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { GetStudentsGradesByCurriculumUseCase } from "../application/get-students-grades-by-curriculum.usecase";
import { CreateBulkGradesDto } from "../dto/create-bulk-grades.dto";
import { CreateBulkGradesUseCase } from "../application/create-bulk-grades.use-case";
import { PutBulkGradesDto } from "../dto/put-bulk-grades.dto";
import { PutBulkGradesUseCase } from "../application/put-bulk-grades.use-case";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { GetMyGradesUseCase } from "../application/get-my-grades.use.case";

@Controller("grade")
export class GradesController {

  constructor(
    private readonly getStudentsGradesUseCase: GetStudentsGradesByCurriculumUseCase,
    private readonly createBulkGradesUseCase: CreateBulkGradesUseCase,
    private readonly putBulkGradesUseCase: PutBulkGradesUseCase,
    private readonly getMyGrades: GetMyGradesUseCase,
  ) {}

  @Get("curriculum/:curriculumId")
  getStudentsGrades(@Param("curriculumId") curriculumId: number) {
    return this.getStudentsGradesUseCase.execute(Number(curriculumId));
  }

  @Post('bulk')
  async createBulkGrades(@Body() dto: CreateBulkGradesDto) {
    return this.createBulkGradesUseCase.execute(dto)
  }

  @Put('bulk')
  async putBulkGrades(@Body() dto: PutBulkGradesDto) {
    return this.putBulkGradesUseCase.execute(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMygrades(@Req() req) {
    return this.getMyGrades.execute(req.user.id)
  }
}


