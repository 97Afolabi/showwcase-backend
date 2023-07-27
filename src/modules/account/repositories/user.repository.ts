import { injectable } from "inversify";
import { BaseRepository } from "../../../config/base-repository";

@injectable()
export default class UserRepository extends BaseRepository {
  async createUser(data: { username: string; password: string }) {
    try {
      const result = await this.execute(
        `INSERT INTO "user" (username, password) VALUES ($1, $2)`,
        [data.username, data.password]
      );

      if (result.rowsAffected == 0) {
        throw new Error("Failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.findOne(
        `SELECT id, username, created_at FROM "user" WHERE id = $1`,
        [id]
      );
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
