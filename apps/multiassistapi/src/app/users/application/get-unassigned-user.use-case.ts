import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { User } from "../infrastructure/user.entity";

@Injectable()
export class GetUnassignedStudentsUseCase {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findUnassignedStudent();
  }
}
