import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AttendanceDayRepository } from "../domain/attendance-day.repository";
import { AttendanceRepository } from "../domain/attendance.repository";
import { MarkAttendanceDto } from "../dto/mark-attendance.dto";
import { User } from "../../users/infrastructure/user.entity";
import { Attendance } from "../infrastructure/attendance.entity";
import { AttendanceStatus } from "../../common/enums";
import { StudentRepository } from "../../students/domain/student.repository";
import { Student } from "../../students/infrastructure/students.entity";

@Injectable()
export class MarkAttendanceUseCase {
  constructor(
    private readonly attendanceRepo: AttendanceRepository,
    private readonly attendanceDayRepo: AttendanceDayRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

  async execute(dto: MarkAttendanceDto, user: User): Promise<Attendance[]> {

    const day = await this.attendanceDayRepo.findByDateAndDivision(dto.date, dto.divisionId);

    if (!day || !day.isOpen) {
      throw new BadRequestException('Attendance is closed or not opened');
    }

    const students: Student[] = await this.studentRepo.findByDivision(dto.divisionId);

    const selectedStudents = students.filter(s => dto.userIds.includes(s.user.id));

    if (selectedStudents.length === 0) {
      throw new NotFoundException('No matching students found for the provided userIds in this division');
    }

    const attendances: Attendance[] = [];

    for (const student of selectedStudents) {
      const existing = await this.attendanceRepo.findByStudentAndDay(student.id, day.id);
      if (existing) continue

      const attendance = new Attendance();
      attendance.student = student;
      attendance.attendanceDay = day;
      attendance.status = AttendanceStatus.PRESENT;
      attendance.recorderBy = user;

      attendances.push(attendance)
    }

    if (attendances.length > 0) {
      return this.attendanceRepo.saveMany(attendances);
    }

    return [];
  }
}
