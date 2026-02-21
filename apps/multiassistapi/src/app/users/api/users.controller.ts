import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserUseCase } from "../application/create-user.use-case";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { CreateAdminUseCase } from "../application/create-admin.use-case";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { RolesGuard } from "../../auth/infrastructure/roles.guard";
import { Roles } from "../../auth/infrastructure/roles.decorator";
import { RoleEnum } from "../../common/enums";
import { GetUserUseCase } from "../application/get-user.use-case";
import { GetUsersByRoleUseCase } from "../application/get-user-by-role.use-case";
import { UpdateUserDto } from "../dto/put-user.dto";
import { UpdateUserUseCase } from "../application/update-user.use-case";
import { DeleteUserUseCase } from "../application/delete-user.use-case";

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUser: GetUserUseCase,
    private readonly getUserByRole: GetUsersByRoleUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly createAdmin: CreateAdminUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get()
  findAll() {
    return this.getUser.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
  @Get('/by-role/:role')
  findByRole(@Param('role') role: string) {
    return this.getUserByRole.execute(role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN)
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
