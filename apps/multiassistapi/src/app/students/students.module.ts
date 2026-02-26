import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./infrastructure/students.entity";
import { StudentRepositoryImpl } from "./infrastructure/student.repository.impl";
import { StudentRepository } from "./domain/student.repository";
import { StudentsController } from "./api/students.controller";
import { AssignDivisionUseCase } from "./application/assign-division.use-case";
import { DivisionModule } from "../divisions/divisions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    DivisionModule,
  ],
  controllers: [StudentsController],
  providers: [
    AssignDivisionUseCase,
    {
      provide: StudentRepository,
      useClass: StudentRepositoryImpl,
    }
  ],
  exports: [],
})
export class StudentModule {}
