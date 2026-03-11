import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserUseCase } from "../application/create-user.use-case";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { CreateAdminUseCase } from "../application/create-admin.use-case";
import { GetUserUseCase } from "../application/get-user.use-case";
import { GetUsersByRoleUseCase } from "../application/get-user-by-role.use-case";
import { UpdateUserDto } from "../dto/put-user.dto";
import { UpdateUserUseCase } from "../application/update-user.use-case";
import { DeleteUserUseCase } from "../application/delete-user.use-case";
import { GetUserByIdUseCase } from "../application/get-user-by-id.use-case";
import { GetUnassignedStudentsUseCase } from "../application/get-unassigned-user.use-case";

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUser: GetUserUseCase,
    private readonly getUserByRole: GetUsersByRoleUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly getUserUnassigned: GetUnassignedStudentsUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly createAdmin: CreateAdminUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  findAll() {
    return this.getUser.execute();
  }

  @Get('/by-role/:role')
  findByRole(@Param('role') role: string) {
    return this.getUserByRole.execute(role);
  }

  @Get('unassigned')
  getUnassigned() {
    return this.getUserUnassigned.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.getUserById.execute(id);
  }

  @Post('/admin')
  createAdm(@Body() dto: CreateAdminDto) {
    return this.createAdmin.execute(dto);
  }

  @Post('/user')
  createUs(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto)
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateUser.execute(+id,dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteUser.execute(id);
  }
}
