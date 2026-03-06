import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curriculum } from "./infrastructure/curriculum.entity";
import { CurriculumController } from "./api/curriculum.controller";
import { FindAllCurriculumUseCase } from "./application/find-all-curriculum.use-case";
import { CurriculumRepository } from "./domain/curriculum.repository";
import { CurriculumRepositoryImpl } from "./infrastructure/curriculum.repository.impl";

@Module({
  imports: [
    TypeOrmModule.forFeature([Curriculum])],
  controllers: [CurriculumController],
  providers: [
    FindAllCurriculumUseCase,
    {
      provide: CurriculumRepository,
      useClass: CurriculumRepositoryImpl,
    }
  ],
  exports: [CurriculumRepository],
})
export class CurriculumModule {}
