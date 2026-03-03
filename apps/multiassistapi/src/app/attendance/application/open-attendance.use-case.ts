import { BadRequestException, Injectable } from "@nestjs/common";
import { AttendanceDayRepository } from "../domain/attendance-day.repository";
import { AttendanceDay } from "../infrastructure/attendance-day.entity";
import { OpenAttendanceDto } from "../dto/open-attendance.dto";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Injectable()
export class OpenAttendanceUseCase {
  constructor(
    private readonly attendanceDayRepo: AttendanceDayRepository,
  ) {}

  async execute(dto: OpenAttendanceDto, user: User) {

    const existing = await this.attendanceDayRepo
      .findByDateAndDivision(dto.date, dto.divisionId);

    if (existing) {
      throw new BadRequestException('Already opened');
    }

    const day = new AttendanceDay();
    day.date = dto.date;
    day.isOpen = true;
    day.division = { id: dto.divisionId } as Division;
    day.openedBy = { id: user.id  } as User;
    return this.attendanceDayRepo.save(day);
  }
}
