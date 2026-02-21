import { BadGatewayException, Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";

@Injectable()
export class GetUsersByRoleUseCase {
  constructor(
    private readonly repo: UserRepository,
  ) {}

  async execute(role: string) {
    if (!role) {
      throw new BadGatewayException('Role is required');
    }
    return this.repo.findByRole(role);
  }
}
