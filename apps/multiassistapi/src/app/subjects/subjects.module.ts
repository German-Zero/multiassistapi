import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Subject } from "./infrastructure/subjects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SubjectModule {}
