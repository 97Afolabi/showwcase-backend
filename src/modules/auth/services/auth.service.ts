import { inject, injectable } from "inversify";
import { IAuthService } from "../../../interfaces/auth.interface";
import { Request, Response } from "express";
import UserRepository from "../../account/repositories/user.repository";

@injectable()
export default class AuthService implements IAuthService {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository
  ) {}
  async register(req: Request, res: Response) {
    try {
      return await res.status(200).json({ message: "hello from service" });
    } catch (error) {
      console.log("Method not implemented.");
    }
  }
  async login(req: Request, res: Response) {
    try {
      return await this.userRepository.findOne();
    } catch (error) {
      console.log("Method not implemented.");
    }
  }
}
