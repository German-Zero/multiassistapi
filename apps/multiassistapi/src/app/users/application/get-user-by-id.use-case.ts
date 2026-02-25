import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute(id: number) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.repo.findById(id);
  }
}
