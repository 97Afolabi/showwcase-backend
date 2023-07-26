import { injectable } from "inversify";
import { IDatabaseQueries } from "../../../interfaces/account.interface";

@injectable()
export default class UserRepository implements IDatabaseQueries {
  async findOne() {
    try {
      return { message: "hello from repository" };
    } catch (error) {
      console.log("Method not implemented.");
    }
  }
  async find() {
    try {
      return { message: "hello" };
    } catch (error) {
      console.log("Method not implemented.");
    }
  }
}
