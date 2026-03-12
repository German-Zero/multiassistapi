import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateBulkGradesDto } from "../dto/create-bulk-grades.dto";
import { CreateBulkGradesUseCase } from "../application/create-bulk-grades.use-case";
import { PutBulkGradesDto } from "../dto/put-bulk-grades.dto";
import { PutBulkGradesUseCase } from "../application/put-bulk-grades.use-case";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { GetMyGradesUseCase } from "../application/get-my-grades.use.case";

@Controller("grade")
export class GradesController {

  constructor(
    private readonly createBulkGradesUseCase: CreateBulkGradesUseCase,
    private readonly putBulkGradesUseCase: PutBulkGradesUseCase,
    private readonly getMyGrades: GetMyGradesUseCase,
  ) {}

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


