import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OpenAttendanceUseCase } from "../application/open-attendance.use-case";
import { MarkAttendanceUseCase } from "../application/mark-attendance.use-case";
import { Roles } from "../../auth/infrastructure/roles.decorator";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { RolesGuard } from "../../auth/infrastructure/roles.guard";
import { RoleEnum } from "../../common/enums";
import { OpenAttendanceDto } from "../dto/open-attendance.dto";
import { MarkAttendanceDto } from "../dto/mark-attendance.dto";
import { JustifyAttendanceDto } from "../dto/justify-attendance.dto";
import { JustifyAttendanceUseCase } from "../application/justify-attendance.use-case";
import { GetAbsentsUseCase } from "../application/get-attendance-absent.use-case";
import { AttendanceResponseDto } from "../dto/res-attendance.dto";
import { GetMyAttendanceUseCase } from "../application/get-my-attendance.use-case";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceController {

  constructor(
    private readonly openUseCase: OpenAttendanceUseCase,
    private readonly markUseCase: MarkAttendanceUseCase,
    private readonly justifyUseCase: JustifyAttendanceUseCase,
    private readonly absentsUseCase: GetAbsentsUseCase,
    private readonly getMyAttendanceUseCase: GetMyAttendanceUseCase,
  ) {}

  @Roles(RoleEnum.PRECEPTOR)
  @Post('open')
  open(@Body() dto: OpenAttendanceDto, @Req() req) {
    return this.openUseCase.execute(dto, req.user);
  }

  @Roles(RoleEnum.PRECEPTOR)
  @Post('mark')
  mark(@Body() dto: MarkAttendanceDto, @Req() req) {
    return this.markUseCase.execute(dto, req.user);
  }

  @Roles(RoleEnum.PRECEPTOR)
  @Post('justify')
  justify(@Body() dto: JustifyAttendanceDto) {
    return this.justifyUseCase.execute(dto)
  }

  @Roles(RoleEnum.PRECEPTOR)
  @Get('absent/:studentId')
  getStudentAbsents(@Req() req, @Param('studentId') studentId: number): Promise<AttendanceResponseDto[]> {
    return this.absentsUseCase.execute(
      req.user.id,
      req.user.roles[1],
      studentId,
    );
  }

  @Get('me')
  getMyAttendance(@Req() req) {
    return this.getMyAttendanceUseCase.execute(req.user.id)
  }

  @Roles(RoleEnum.PRECEPTOR)
  @Get('absent')
  getMyAbsents(@Req() req) {
  return this.absentsUseCase.execute(
    req.user.id,
    req.user.role,
  );
}
}
