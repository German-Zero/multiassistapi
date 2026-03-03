import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AttendanceRepository } from "../domain/attendance.repository";
import { JustifyAttendanceDto } from "../dto/justify-attendance.dto";
import { AttendanceStatus } from "../../common/enums";
import { StudentRepository } from "../../students/domain/student.repository";

@Injectable()
export class JustifyAttendanceUseCase {
  constructor(
    private readonly attendanceRepo: AttendanceRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

async execute(dto: JustifyAttendanceDto) {

  const attendance = await this.attendanceRepo.findByStudentAndDay(
    dto.studentId,
    dto.attendanceDayId,
  );

  if (!attendance) {
    throw new NotFoundException('Attendance not found');
  }

  if (attendance.status !== AttendanceStatus.ABSENT) {
    throw new BadRequestException('Only ABSENT can be Justified');
  }

  attendance.status = AttendanceStatus.JUSTIFIED;
  attendance.justification = dto.justification;

  return this.attendanceRepo.save(attendance);
}
}
