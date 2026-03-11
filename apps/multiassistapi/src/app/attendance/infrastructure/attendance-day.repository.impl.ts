import { Injectable } from "@nestjs/common";
import { AttendanceDayRepository } from "../domain/attendance-day.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AttendanceDay } from "./attendance-day.entity";
import { OrderedBulkOperation, Repository } from "typeorm";

@Injectable()
export class AttendanceDayRepositoryImpl implements AttendanceDayRepository {
  constructor(
    @InjectRepository(AttendanceDay)
    private readonly repo: Repository<AttendanceDay>
  ) {}

  findByDate(date: string): Promise<AttendanceDay | null> {
    return this.repo.findOne({ where: { date } });
  }

  save(attendanceDay: AttendanceDay): Promise<AttendanceDay> {
    return this.repo.save(attendanceDay);
  }

  findByDateAndDivision(date: string, divisionId: number) {
    return this.repo.findOne({
      where: {
        date,
        division: { id: Number(divisionId) },
      },
      relations: ['division'],
    });
  }

  findOpenByDate(date: string): Promise<AttendanceDay[]> {
    return this.repo.find({
      where: {
        date,
        isOpen: true,
      },
      relations: ['division'],
    });
  }


}
