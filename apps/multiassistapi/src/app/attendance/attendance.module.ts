import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceDay } from "./infrastructure/attendance-day.entity";
import { Attendance } from "./infrastructure/attendance.entity";
import { ScheduleModule } from "@nestjs/schedule";
import { AttendanceController } from "./api/attendance.controller";
import { OpenAttendanceUseCase } from "./application/open-attendance.use-case";
import { MarkAttendanceUseCase } from "./application/mark-attendance.use-case";
import { CloseAttendanceUseCase } from "./application/close-attendance.use-case";
import { JustifyAttendanceUseCase } from "./application/justify-attendance.use-case";
import { AttendanceCron } from "./cron/attendance.scheduler";
import { AttendanceRepository } from "./domain/attendance.repository";
import { AttendanceRepositoryImpl } from "./infrastructure/attendance.repository.impl";
import { AttendanceDayRepository } from "./domain/attendance-day.repository";
import { AttendanceDayRepositoryImpl } from "./infrastructure/attendance-day.repository.impl";
import { StudentModule } from "../students/students.module";
import { GetAbsentsUseCase } from "./application/get-attendance-absent.use-case";
import { GetMyAttendanceUseCase } from "./application/get-my-attendance.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([AttendanceDay, Attendance]),
    ScheduleModule.forRoot(),
    StudentModule,
  ],
  controllers: [AttendanceController],
  providers: [
    OpenAttendanceUseCase,
    MarkAttendanceUseCase,
    CloseAttendanceUseCase,
    JustifyAttendanceUseCase,
    GetAbsentsUseCase,
    GetMyAttendanceUseCase,
    AttendanceCron,
    {
      provide: AttendanceRepository,
      useClass: AttendanceRepositoryImpl,
    },
    {
      provide: AttendanceDayRepository,
      useClass: AttendanceDayRepositoryImpl,
    }
  ],
  exports: [],
})
export class AttendanceModule {}

