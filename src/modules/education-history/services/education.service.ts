import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import EducationRepository from "../repositories/education.repository";
import { IEducation } from "../../../interfaces/education.interface";

@injectable()
export default class EducationService {
  constructor(
    @inject(EducationRepository)
    private educationRepository: EducationRepository
  ) {}
  async create(data: IEducation) {
    try {
      data.start_date = new Date(data.start_date).toDateString();
      if (data.end_date) {
        data.end_date = new Date(data.end_date).toDateString();
      }
      await this.educationRepository.create(data);
    } catch (error) {
      console.error(error);
    }
  }
}
