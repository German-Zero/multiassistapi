import { GradeType } from "../../common/enums";
import { PutGradeItemDto } from "./put-bulk-item.dto";

export class PutBulkGradesDto {
  description?: string;
  type?: GradeType;
  grades: PutGradeItemDto[];
}
