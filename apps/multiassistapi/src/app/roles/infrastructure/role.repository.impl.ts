import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../domain/role.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./roles.entity";
import { Repository } from "typeorm";
import { RoleEnum } from "../../common/enums";

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  findByName(name: RoleEnum): Promise<Role | null> {
    return this.repo.findOne({ where: { name } });
  }
}
