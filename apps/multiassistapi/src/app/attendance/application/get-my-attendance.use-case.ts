import { Injectable } from "@nestjs/common";
import { AttendanceRepository } from "../domain/attendance.repository";

@Injectable()
export class GetMyAttendanceUseCase {
  constructor(
    private readonly repo: AttendanceRepository
  ) {}

  async execute(userId: number) {
    const rows = await this.repo.findAttendanceByUser(userId)

    return rows.map(a => ({
      id: a.id,
      day: a.date,
      status: a.status,
      justification: a.justification
    }));
  }
}
