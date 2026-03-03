import { Injectable } from "@nestjs/common";
import { AttendanceRepository } from "../domain/attendance.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Attendance } from "./attendance.entity";
import { In, Repository } from "typeorm";
import { AttendanceDay } from "./attendance-day.entity";
import { AttendanceStatus } from "../../common/enums";

@Injectable()
export class AttendanceRepositoryImpl implements AttendanceRepository {
  constructor(
    @InjectRepository(Attendance)
    private readonly repoAttendace: Repository<Attendance>,
    @InjectRepository(AttendanceDay)
    private readonly repoAttendanceDay: Repository<AttendanceDay>,
  ) {}

  findByDateAndDivision(date: string, divisionId: string) {
  return this.repoAttendanceDay.findOne({
    where: {
      date,
      division: { id: Number(divisionId) },
    },
    relations: ['division'],
  });
}

  findAbsentsByStudent(studentId: number): Promise<Attendance[]> {
    return this.repoAttendace.find({
      where: {
        student: { id: studentId },
        status: In([AttendanceStatus.ABSENT, AttendanceStatus.JUSTIFIED]),
      },
      relations: ['attendanceDay'],
      order: {
        attendanceDay: {
          date: 'DESC'
        },
      },
    });
  }

  findByDay(dayId: number): Promise<Attendance[]> {
  return this.repoAttendace.find({
    where: {
      attendanceDay: { id: dayId },
    },
    relations: ['student'],
  });
}

  findByStudentAndDay(studentId: number, dayId: number) {
  return this.repoAttendace.findOne({
    where: {
      student: { id: Number(studentId) },
      attendanceDay: { id: Number(dayId) },
    },
  });
}

  save(attendance: Attendance): Promise<Attendance> {
    return this.repoAttendace.save(attendance);
  }

  saveMany(attendance: Attendance[]): Promise<Attendance[]> {
    return this.repoAttendace.save(attendance)
  }
}
