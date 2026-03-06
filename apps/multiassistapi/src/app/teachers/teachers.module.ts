import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./infrastructure/teachers.entity";
import { TeachersController } from "./api/teachers.controller";
import { TeacherRepository } from "./domain/teacher.repository";
import { TeacherRepositoryImpl } from "./infrastructure/teacher.repository.impl";
import { AssignTeacherToCurriculumUseCase } from "./application/assign-teacher.use-case";
import { CurriculumModule } from "../curriculum/curriculum.module";
import { UsersModule } from "../users/users.module";
import { ReassignTeacherUseCase } from "./application/reassign-teacher.use-case";
import { GetAcademyByTeacherUseCase } from "./application/get-academy-by-teacher.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    CurriculumModule,
    UsersModule,
  ],
  controllers: [TeachersController],
  providers: [
    AssignTeacherToCurriculumUseCase,
    ReassignTeacherUseCase,
    GetAcademyByTeacherUseCase,
    {
      provide: TeacherRepository,
      useClass: TeacherRepositoryImpl,
    },
  ],
  exports: [],
})
export class TeacherModule {}
