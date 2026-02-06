import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateUserUseCase } from "../application/create-user.use-case";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { CreateAdminUseCase } from "../application/create-admin.use-case";
import { JwtAuthGuard } from "../../auth/infrastructure/jwt.guard";
import { RolesGuard } from "../../auth/infrastructure/roles.guard";
import { Roles } from "../../auth/infrastructure/roles.decorator";
import { RoleEnum } from "../../common/enums";
import { RegisterUserDto } from "../dto/register-user.dto";
import { RegisterUserUseCase } from "../application/register-user.use-case";

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly createAdmin: CreateAdminUseCase,
    private readonly registerUser: RegisterUserUseCase,
  ) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.PRECEPTOR)
  @Post('/register')
  register(@Body() dto: RegisterUserDto) {
    return this.registerUser.execute(dto);
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
}
