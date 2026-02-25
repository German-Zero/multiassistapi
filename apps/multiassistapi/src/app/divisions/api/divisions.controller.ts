import { Controller, Get } from "@nestjs/common";
import { GetDivisionUseCase } from "../application/get-division.use-case";

@Controller('divisions')
export class DivisionsController {
  constructor(
    private readonly getDivisionUseCase: GetDivisionUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getDivisionUseCase.execute();
  }
}
