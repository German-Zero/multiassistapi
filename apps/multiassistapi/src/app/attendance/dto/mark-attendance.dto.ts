import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt } from "class-validator";

export class MarkAttendanceDto {
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  userIds: number[];

  @IsInt()
  divisionId: number;
}
