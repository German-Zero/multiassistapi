import { PutBulkGradesDto } from "../dto/put-bulk-grades.dto";
import { Grade } from "../infrastructure/grades.entity";

export abstract class GradesRepository {
  abstract saveBulkGrades(grades: Grade[]): Promise<void>
  abstract putBulkGrades(dto: PutBulkGradesDto): Promise<void>;
  abstract findGradesByUser(UserId: number): Promise<any[]>
}
