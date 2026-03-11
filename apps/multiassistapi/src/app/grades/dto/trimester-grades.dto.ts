import { GradeItemDto } from "./grade-item.dto";

export class TrimesterGradesDto {
  grades: GradeItemDto[];
  average: number | null;
}
