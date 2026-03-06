import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscilpinaryAction } from "./infrastructure/disciplinary-actions.entity";
import { StudentModule } from "../students/students.module";
import { DisciplinaryController } from "./api/disciplinary-actions.controller";
import { GetDisciplinaryByStudentUseCase } from "./application/get-disciplinary.use-case";
import { PutDisciplinaryUseCase } from "./application/put-disciplinary.use-case";
import { CreateDisciplinaryUseCase } from "./application/post-disciplinary.use-case";
import { DisciplinaryRepository } from "./domain/disciplinary-actions.repository";
import { DisciplinaryRepositoryImpl } from "./infrastructure/disciplinary-actions.repository.impl";
import { GetDisciplinaryByIdUseCase } from "./application/get-discplinary-by-id.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscilpinaryAction]),
    StudentModule,
  ],
  controllers: [DisciplinaryController],
  providers: [
    GetDisciplinaryByStudentUseCase,
    CreateDisciplinaryUseCase,
    PutDisciplinaryUseCase,
    GetDisciplinaryByIdUseCase,
    {
      provide: DisciplinaryRepository,
      useClass: DisciplinaryRepositoryImpl,
    },
  ],
  exports: [],
})
export class DiscilpinaryActionModule {}
