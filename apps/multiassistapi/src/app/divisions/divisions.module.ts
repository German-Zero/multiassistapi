import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Division } from "./infrastructure/divisions.entity";
import { DivisionsController } from "./api/divisions.controller";
import { GetDivisionUseCase } from "./application/get-division.use-case";
import { DivisionRepository } from "./domain/division.repository";
import { DivisionRepositoryImpl } from "./infrastructure/division.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [DivisionsController],
  providers: [
    GetDivisionUseCase,
    {
      provide: DivisionRepository,
      useClass: DivisionRepositoryImpl,
    }
  ],
  exports: [],
})
export class DivisionModule {}
