import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./infrastructure/students.entity";
import { StudentRepositoryImpl } from "./infrastructure/student.repository.impl";
import { StudentRepository } from "./domain/student.repository";
import { StudentsController } from "./api/students.controller";
import { AssignDivisionUseCase } from "./application/assign-division.use-case";
import { DivisionModule } from "../divisions/divisions.module";
import { GetStudentUseCase } from "./application/get-student.use-case";
import { GetStudentsByDivisionUseCase } from "./application/get-student-by-division.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    DivisionModule,
  ],
  controllers: [StudentsController],
  providers: [
    GetStudentsByDivisionUseCase,
    AssignDivisionUseCase,
    GetStudentUseCase,

    {
      provide: StudentRepository,
      useClass: StudentRepositoryImpl,
    }
  ],
  exports: [StudentRepository],
})
export class StudentModule {}
