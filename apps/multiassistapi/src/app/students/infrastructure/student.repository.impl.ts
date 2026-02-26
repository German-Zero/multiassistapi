import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { StudentRepository } from "../domain/student.repository";
import { DataSource, In } from "typeorm";
import { Student } from "./students.entity";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  findByUserIds(userIds: number[]): Promise<Student[]> {
    return this.dataSource.getRepository(Student).find({
      where: {
        user: {
          id: In(userIds)
        },
      },
      relations: ['user', 'division'],
    });
  }

  saveMany(students: Student[]): Promise<Student[]> {
    return this.dataSource.getRepository(Student).save(students);
  }
}
