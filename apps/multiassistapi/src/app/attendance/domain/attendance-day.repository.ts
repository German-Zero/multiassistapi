import { AttendanceDay } from "../infrastructure/attendance-day.entity";

export abstract class AttendanceDayRepository {
  abstract findByDate(date: string): Promise<AttendanceDay | null>;
  abstract save(day: AttendanceDay): Promise<AttendanceDay>;
  abstract findByDateAndDivision(date: string, divisionId: number): Promise<AttendanceDay | null>;
  abstract findOpenByDate(date: string): Promise<AttendanceDay[]>;
}
