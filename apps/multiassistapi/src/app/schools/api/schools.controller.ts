import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { RolesGuard } from "../../auth/infrastructure/roles.guard";
import { Roles } from "../../auth/infrastructure/roles.decorator";
import { GetSchoolUseCase } from "../application/get-shools.use-case";
import { RoleEnum } from "../../common/enums";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN)
@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly getSchoolUseCase: GetSchoolUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getSchoolUseCase.execute();
  }
}
