import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Division } from "./infrastructure/divisions.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DivisionModule {}
