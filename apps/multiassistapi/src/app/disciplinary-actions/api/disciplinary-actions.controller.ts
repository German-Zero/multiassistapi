import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { GetDisciplinaryByStudentUseCase } from "../application/get-disciplinary.use-case";
import { CreateDisciplinaryUseCase } from "../application/post-disciplinary.use-case";
import { PutDisciplinaryUseCase } from "../application/put-disciplinary.use-case";
import { PostDisciplinaryDto } from "../dto/post-disciplinary.dto";
import { PutDisciplinaryDto } from "../dto/put-disciplinary.dto";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { GetDisciplinaryByIdUseCase } from "../application/get-discplinary-by-id.use-case";
import { GetMyWarningUseCase } from "../application/get-my-disciplinary.use-case";

@UseGuards(JwtAuthGuard)
@Controller('disciplinary-action')
export class DisciplinaryController {
  constructor(
    private readonly getUseCase: GetDisciplinaryByStudentUseCase,
    private readonly getByIdUseCase: GetDisciplinaryByIdUseCase,
    private readonly getMyWarningsUseCase: GetMyWarningUseCase,
    private readonly postUseCase: CreateDisciplinaryUseCase,
    private readonly putUseCase: PutDisciplinaryUseCase,
  ) {}

  @Post()
  create(@Body() dto: PostDisciplinaryDto, @Req() req) {
    return this.postUseCase.execute(dto, req.user);
  }

  @Get('by-student/:studentId')
  getByStudent(@Param('studentId') studentId: number) {
    return this.getUseCase.execute(Number(studentId));
  }

    @Get('me')
    getMyWarnings(@Req() req) {
      return this.getMyWarningsUseCase.execute(req.user.id)
    }

  @Get('by-id/:id')
  getById(@Param('id') id: number) {
    return this.getByIdUseCase.execute(id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: PutDisciplinaryDto) {
    return this.putUseCase.execute(Number(id), dto)
  }
}
