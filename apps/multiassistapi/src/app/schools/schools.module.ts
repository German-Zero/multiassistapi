import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { School } from "./infrastructure/schools.entity";

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SchoolModule {}
