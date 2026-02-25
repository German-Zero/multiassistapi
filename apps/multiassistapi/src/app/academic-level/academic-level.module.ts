import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcademicLevel } from "./infrastructure/academic-level.entity";
import { AcademicLevelRepositoryImpl } from "./infrastructure/academic-level.repository.impl";
import { AcademicLevelRepository } from "./domain/academic-level.repository";
import { GetAcademicLevelUseCase } from "./application/get-academic-leve.use-case";
import { AcademicLevelController } from "./api/academic-level.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AcademicLevel])],
  controllers: [AcademicLevelController],
  providers: [
    GetAcademicLevelUseCase,
    {
      provide: AcademicLevelRepository,
      useClass: AcademicLevelRepositoryImpl
    },
  ],
  exports: [],
})
export class AcademicLevelModule {}
