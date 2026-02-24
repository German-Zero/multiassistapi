import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { UpdateUserDto } from "../dto/put-user.dto";
import { School } from "../../schools/infrastructure/schools.entity";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute (id: number, dto: UpdateUserDto) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (dto.name) {
      user.name = dto.name;
    }
    if (dto.middlename) {
      user.middleName = dto.middlename;
    }
    if (dto.lastname) {
      user.lastname = dto.lastname;
    }
    if (dto.email) {
      user.email = dto.email;
    }
    if (dto.dni) {
      user.dni = dto.dni;
    }
    if (dto.schoolId) {
      user.school = { id: dto.schoolId } as School;
    }

    user.displayName = `${user.name} ${user.middleName ? user.middleName + ' ' : ''}${user.lastname}`;

    return this.repo.update(user);
  }
}
