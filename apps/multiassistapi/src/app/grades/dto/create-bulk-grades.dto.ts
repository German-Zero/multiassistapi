import { GradeType } from "../../common/enums";
import { GradeBulkItemDto } from "./grade-bulk-item.dto";

export class CreateBulkGradesDto {
  curriculumId: number;
  trimesterId: number;
  description: string;
  type: GradeType;
  grades: GradeBulkItemDto[];
}
