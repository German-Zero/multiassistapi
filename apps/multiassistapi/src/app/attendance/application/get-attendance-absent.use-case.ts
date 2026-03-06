import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { StudentRepository } from "../../students/domain/student.repository";
import { AttendanceRepository } from "../domain/attendance.repository";
import { RoleEnum } from "../../common/enums";

@Injectable()
export class GetAbsentsUseCase {
  constructor(
    private readonly studentRepo: StudentRepository,
    private readonly attendanceRepo: AttendanceRepository,
  ) {}

  async execute(userId: number, role: string, studentId?: number) {
  let targetStudentId: number;

  if (role === RoleEnum.ALUMNO) {
    const student = await this.studentRepo.findByUserId(userId);
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    targetStudentId = student.id;

    } else if (role === RoleEnum.PRECEPTOR) {
      if (!studentId) {
        throw new BadRequestException('studentId required');
      }

      targetStudentId = studentId
    } else {
      throw new ForbiddenException();
    }

    const absents = await this.attendanceRepo.findAbsentsByStudent(targetStudentId);

    return absents.map(a => ({
      id: a.id,
      status: a.status,
      justification: a.justification,
      attendanceDay: {
        id: a.attendanceDay.id,
        date: a.attendanceDay.date,
        isOpen: a.attendanceDay.isOpen,
      }
    }));
  }
}
