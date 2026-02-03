import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../infrastructure/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findByUsername(name: string) {
    return this.repo.findOne({ where: { name } });
  }
}
