import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curriculum } from "./infrastructure/curriculum.entity";
import { CurriculumController } from "./api/curriculum.controller";
import { FindAllCurriculumUseCase } from "./application/find-all-curriculum.use-case";
import { CurriculumRepository } from "./domain/curriculum.repository";
import { CurriculumRepositoryImpl } from "./infrastructure/curriculum.repository.impl";
import { GetAllCurriculumUseCase } from "./application/get-curriculum.use-case";
import { PostCurriculumUseCase } from "./application/post-curriculum.use-case";
import { PutCurriculumUseCase } from "./application/put-curriculum.use-case";
import { DeleteCurriculumUseCase } from "./application/delete-curriculum.use-case";
import { GetStudentByCurriculumUseCase } from "./application/get-student-by-curriculum.use-case";
import { StudentModule } from "../students/students.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Curriculum]),
    StudentModule,
  ],
  controllers: [CurriculumController],
  providers: [
    FindAllCurriculumUseCase,
    GetAllCurriculumUseCase,
    GetStudentByCurriculumUseCase,
    PostCurriculumUseCase,
    PutCurriculumUseCase,
    DeleteCurriculumUseCase,
    {
      provide: CurriculumRepository,
      useClass: CurriculumRepositoryImpl,
    }
  ],
  exports: [CurriculumRepository],
})
export class CurriculumModule {}
