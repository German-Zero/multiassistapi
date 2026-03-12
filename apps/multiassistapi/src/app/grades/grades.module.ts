import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./infrastructure/grades.entity";
import { Trimester } from "./infrastructure/trimester.entity";
import { RecoveryExam } from "./infrastructure/recovery-exam.entity";
import { GradesController } from "./api/grades.controller";
import { GetStudentsGradesByCurriculumUseCase } from "../students/application/get-students-grades-by-curriculum.usecase";
import { GradesRepository } from "./domain/grades.repository";
import { GradesRepositoryImpl } from "./infrastructure/grades.repository.impl";
import { StudentModule } from "../students/students.module";
import { CreateBulkGradesUseCase } from "./application/create-bulk-grades.use-case";
import { PutBulkGradesUseCase } from "./application/put-bulk-grades.use-case";
import { GetMyGradesUseCase } from "./application/get-my-grades.use.case";

@Module({
  imports: [
    TypeOrmModule.forFeature([Grade, Trimester, RecoveryExam]),
    StudentModule,
  ],
  controllers: [GradesController],
  providers: [
    GetStudentsGradesByCurriculumUseCase,
    CreateBulkGradesUseCase,
    PutBulkGradesUseCase,
    GetMyGradesUseCase,
    {
      provide: GradesRepository,
      useClass: GradesRepositoryImpl
    }
  ],
  exports: [GradesRepository],
})
export class GradeModule {}
