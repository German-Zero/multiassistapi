import { Attendance } from "../infrastructure/attendance.entity";

export abstract class AttendanceRepository {
  abstract findByStudentAndDay(studentId: number, attendanceDayId: number): Promise<Attendance | null>;
  abstract findAbsentsByStudent(studentId: number): Promise<Attendance[]>;
  abstract findByDay(attendanceDayId: number): Promise<Attendance[]>;
  abstract findAttendanceByUser(userId: number): Promise<any[]>;
  abstract save(attendance: Attendance): Promise<Attendance>;
  abstract saveMany(attendances: Attendance[]): Promise<Attendance[]>;
}
