import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class GetUserUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
