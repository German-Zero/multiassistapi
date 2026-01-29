import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../domain/users.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Get(':username')
    async getOne(@Param('username') username: string) {
      return this.service.findByUsername(username)
    }
  }
