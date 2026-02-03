import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "./infrastructure/addresses.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AddressModule {}
