import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import * as bcrypt from "bcrypt";
import { IAuthService } from "../../../interfaces/auth.interface";
import UserRepository from "../../account/repositories/user.repository";

@injectable()
export default class AuthService implements IAuthService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}
  async register(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt();

      const hash = await bcrypt.hash(password, salt);

      await this.userRepository.createUser({ username, password: hash });
      return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "User registration failed" });
    }
  }
  login(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  findById(id: string) {
    throw new Error("Method not implemented.");
  }
}
