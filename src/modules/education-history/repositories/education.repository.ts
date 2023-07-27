import { injectable } from "inversify";
import { BaseRepository } from "../../../config/base-repository";
import { IEducation } from "../../../interfaces/education.interface";

@injectable()
export default class EducationRepository extends BaseRepository {
  async create(data: IEducation) {
    try {
      const {
        school,
        degree,
        field,
        start_date,
        end_date,
        grade,
        description,
        user_id,
      } = data;
      const result = await this.execute(
        `INSERT INTO "education" (school, degree, field, start_date, end_date, grade, description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          school,
          degree,
          field,
          start_date,
          end_date,
          grade,
          description,
          user_id,
        ]
      );

      if (result.rowsAffected == 0) {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
