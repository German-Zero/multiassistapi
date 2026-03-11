import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CloseAttendanceUseCase } from "../application/close-attendance.use-case";

@Injectable()
export class AttendanceCron {
  constructor(
    private readonly closeAttendanceUseCase: CloseAttendanceUseCase,
  ) {}

  async onModuleInit() {
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
    }).format(new Date());

    await this.closeAttendanceUseCase.execute(today)
  }

  @Cron('0 0 22 * * *', {
    timeZone: 'America/Argentina/Buenos_Aires'
  })
  async handleCloseAttendance() {
    const today = new Date().toISOString().split('T')[0];

    await this.closeAttendanceUseCase.execute(today);
  }
}
