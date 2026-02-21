import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./infrastructure/schools.entity";
import { SchoolsController } from "./api/schools.controller";
import { GetSchoolUseCase } from "./application/get-shools.use-case";
import { SchoolRepository } from "./domain/school.repository";
import { SchoolRepositoryImpl } from "./infrastructure/school.repository.impl";
import { Address } from "../addresses/infrastructure/addresses.entity";
import { CreateSchoolUseCase } from "./application/create-schools.use-case";
import { UpdateSchoolUseCase } from "./application/update-schools.use-case";
import { DeleteSchoolUseCase } from "./application/delete-schools.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([School, Address])],
  controllers: [SchoolsController],
  providers: [
    GetSchoolUseCase,
    CreateSchoolUseCase,
    UpdateSchoolUseCase,
    DeleteSchoolUseCase,
    {
      provide: SchoolRepository,
      useClass: SchoolRepositoryImpl,
    }
  ],
  exports: [],
})
export class SchoolModule {}
