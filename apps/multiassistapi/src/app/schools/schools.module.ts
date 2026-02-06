import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./infrastructure/schools.entity";
import { SchoolsController } from "./api/schools.controller";
import { GetSchoolUseCase } from "./application/get-shools.use-case";
import { SchoolRepository } from "./domain/school.repository";
import { SchoolRepositoryImpl } from "./infrastructure/school.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolsController],
  providers: [
    GetSchoolUseCase, {
      provide: SchoolRepository,
      useClass: SchoolRepositoryImpl,
    }
  ],
  exports: [],
})
export class SchoolModule {}
