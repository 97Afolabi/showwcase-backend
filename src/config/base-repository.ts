import { injectable } from "inversify";
import { Client, QueryResult, DatabaseError } from "pg";
import dbConfig from "./database.config";

@injectable()
export class BaseRepository {
  private client: Client;
  private result: QueryResult;

  constructor() {
    this.client = dbConfig;
  }

  async findOne<T>(text: string, params?, callback?): Promise<T> {
    try {
      this.result = await this.query(text, params, callback);
      return this.result.rows[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  async find<T>(text: string, params?, callback?): Promise<T[]> {
    try {
      this.result = await this.query(text, params, callback);
      return this.result.rows;
    } catch (error) {
      throw new Error(error);
    }
  }

  async execute(
    text: string,
    params?,
    callback?
  ): Promise<{ rowsAffected: number }> {
    try {
      this.result = await this.query(text, params, callback);
      return { rowsAffected: this.result.rowCount };
    } catch (error) {
      throw new Error(error);
    }
  }

  private async query(text: string, params?, callback?): Promise<QueryResult> {
    try {
      await this.client.connect();

      return await this.client.query(text, params);
    } catch (error) {
      throw new DatabaseError(error.message, error.length, error.code);
    } finally {
      await this.client.end();
    }
  }
}
