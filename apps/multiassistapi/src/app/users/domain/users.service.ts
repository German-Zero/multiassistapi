import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../infrastructure/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async create (data: CreateUserDto) {
    const user = this.repo.create({
      username: data.username,
      passwordHash: data.password,
      role: data.role,
    });

    return this.repo.save(user);
  }
}
