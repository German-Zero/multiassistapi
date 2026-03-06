import { Injectable, NotFoundException } from "@nestjs/common";
import { Student } from "../infrastructure/students.entity";
import { DataSource, In } from "typeorm";
import { AssignDivisionDto } from "../dto/assign-division.dto";
import { User } from "../../users/infrastructure/user.entity";
import { Division } from "../../divisions/infrastructure/divisions.entity";

@Injectable()
export class AssignDivisionUseCase {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: AssignDivisionDto) {
    return this.dataSource.transaction(async (manager) => {
      const userRepo = manager.getRepository(User);
      const studentRepo = manager.getRepository(Student);
      const divisionRepo = manager.getRepository(Division);

      const division = await divisionRepo.findOne({
        where: { id: dto.divisionId },
      });

      if (!division) {
        throw new NotFoundException('Division Not Found');
      }

      const users = await userRepo.find({
        where: { id: In(dto.userIds) },
      });

      if (users.length !== dto.userIds.length) {
        throw new NotFoundException('Some Users Not Found');
      }

      const studentsToSave: Student[] = [];

      for (const user of users) {
        let student = await studentRepo.findOne({
          where: { user: { id: user.id } },
          relations: ['user'],
        });

        if (!student) {
          student = studentRepo.create({ user });
        }

        student.division = division;
        studentsToSave.push(student);
      }

      return studentRepo.save(studentsToSave);
    });
  }
}
