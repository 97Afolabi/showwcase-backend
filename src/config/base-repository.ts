import { injectable } from "inversify";
import { Pool, QueryResult, DatabaseError } from "pg";
import dbConfig from "./database.config";

@injectable()
export class BaseRepository {
  private db: Pool;
  private result: QueryResult;

  constructor() {
    this.db = dbConfig;
  }

  async findOne<T>(text: string, params?): Promise<T> {
    try {
      this.result = await this.query(text, params);
      return this.result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async find<T>(text: string, params?): Promise<T[]> {
    try {
      this.result = await this.query(text, params);
      return this.result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async execute(text: string, params?): Promise<{ rowsAffected: number }> {
    try {
      this.result = await this.query(text, params);
      return { rowsAffected: this.result.rowCount };
    } catch (error) {
      throw new Error(error);
    }
  }

  private async query(text: string, params?): Promise<QueryResult> {
    const connection = await this.db.connect();
    try {
      return await this.db.query(text, params);
    } catch (error) {
      throw new DatabaseError(error.message, error.length, error.code);
    } finally {
      connection.release();
    }
  }
}
