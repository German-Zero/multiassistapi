import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscilpinaryAction } from "./infrastructure/disciplinary-actions.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DiscilpinaryAction])],
  controllers: [],
  providers: [],
  exports: [],
})
export class DiscilpinaryActionModule {}
