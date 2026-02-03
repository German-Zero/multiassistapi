import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "../domain/users.service";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get(':name')
    async getOne(@Param('name') name: string) {
      return this.service.findByUsername(name)
    }
  }
