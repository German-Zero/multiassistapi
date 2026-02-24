import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { RolesGuard } from "../../auth/infrastructure/roles.guard";
import { Roles } from "../../auth/infrastructure/roles.decorator";
import { RoleEnum } from "../../common/enums";
import { GetSchoolUseCase } from "../application/get-shools.use-case";
import { CreateSchoolUseCase } from "../application/create-schools.use-case";
import { UpdateSchoolUseCase } from "../application/update-schools.use-case";
import { DeleteSchoolUseCase } from "../application/delete-schools.use-case";
import { CreateSchoolDto } from "../dto/create-school.dto";
import { UpdateSchoolDto } from "../dto/update-school.dto";


@Controller('schools')
export class SchoolsController {
  constructor(
    private readonly getSchoolUseCase: GetSchoolUseCase,
    private readonly createSchoolUseCase: CreateSchoolUseCase,
    private readonly updateSchoolUseCase: UpdateSchoolUseCase,
    private readonly deleteSchoolUseCase: DeleteSchoolUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Post()
  create(@Body() dto: CreateSchoolDto) {
    return this.createSchoolUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.getSchoolUseCase.execute();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateSchoolDto,
  ) {
    return this.updateSchoolUseCase.execute(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteSchoolUseCase.execute(+id);
  }
}
