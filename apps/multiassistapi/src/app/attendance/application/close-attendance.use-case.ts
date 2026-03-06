import { Injectable } from "@nestjs/common";
import { AttendanceDayRepository } from "../domain/attendance-day.repository";
import { AttendanceRepository } from "../domain/attendance.repository";
import { StudentRepository } from "../../students/domain/student.repository";
import { Attendance } from "../infrastructure/attendance.entity";
import { AttendanceStatus } from "../../common/enums";

@Injectable()
export class CloseAttendanceUseCase {

  constructor(
    private readonly attendanceDayRepo: AttendanceDayRepository,
    private readonly attendanceRepo: AttendanceRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

  async execute(date: string): Promise<void> {

    const openDays = await this.attendanceDayRepo.findOpenByDate(date);
    if (!openDays.length) return;

    for (const day of openDays) {

      const students = await this.studentRepo
        .findByDivision(day.division.id);

      const existing = await this.attendanceRepo
        .findByDay(day.id);

      const registeredIds = new Set(
        existing.map(a => a.student.id)
      );

      const absents: Attendance[] = [];

      for (const student of students) {
        if (!registeredIds.has(student.id)) {

          const attendance = new Attendance();
          attendance.student = student;
          attendance.attendanceDay = day;
          attendance.status = AttendanceStatus.ABSENT;
          attendance.recorderBy = null;

          absents.push(attendance);
        }
      }

      if (absents.length) {
        await this.attendanceRepo.saveMany(absents);
      }

      day.isOpen = false;
      await this.attendanceDayRepo.save(day);
    }
  }
}



