import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute(id: number) {
    const user = await this.repo.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    await this.repo.remove(user);
  }
}
