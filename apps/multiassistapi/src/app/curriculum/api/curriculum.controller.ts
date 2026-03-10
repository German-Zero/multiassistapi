import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GetAllCurriculumUseCase } from "../application/get-curriculum.use-case";
import { PostCurriculumUseCase } from "../application/post-curriculum.use-case";
import { PutCurriculumUseCase } from "../application/put-curriculum.use-case";
import { DeleteCurriculumUseCase } from "../application/delete-curriculum.use-case";
import { PutCurriculumDto } from "../dto/put-curriculum.dto";
import { PostCurriculumDto } from "../dto/post-curriculum.dto";
import { GetStudentByCurriculumUseCase } from "../application/get-student-by-curriculum.use-case";

@Controller('curriculum')
export class CurriculumController {
  constructor(
    private readonly getStudentUseCase: GetStudentByCurriculumUseCase,
    private readonly findAllUseCase: GetAllCurriculumUseCase,
    private readonly postUseCase: PostCurriculumUseCase,
    private readonly putUseCase: PutCurriculumUseCase,
    private readonly deleteUseCase: DeleteCurriculumUseCase,
  ) {}

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id/students')
  getStudents(@Param('id') id: number) {
    return this.getStudentUseCase.execute(id)
  }

  @Put(':id')
  findById(@Param('id') id: number, @Body() dto: PutCurriculumDto) {
    return this.putUseCase.execute(id, dto);
  }

  @Post()
  create(@Body() dto: PostCurriculumDto) {
    return this.postUseCase.execute(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.deleteUseCase.execute(id)
  }
}
