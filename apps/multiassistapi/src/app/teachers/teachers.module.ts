import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./infrastructure/teachers.entity";
import { TeachersController } from "./api/teachers.controller";
import { CreateTeacherUseCase } from "./application/create-teacher.use-case";
import { TeacherRepository } from "./domain/teacher.repository";
import { TeacherRepositoryImpl } from "./infrastructure/teacher.repository.impl";

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
  ],
  controllers: [TeachersController],
  providers: [
    CreateTeacherUseCase,
    {
      provide: TeacherRepository,
      useClass: TeacherRepositoryImpl,
    },
  ],
  exports: [],
})
export class TeacherModule {}
