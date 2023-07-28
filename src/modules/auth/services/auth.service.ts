import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import * as bcrypt from "bcrypt";
import { IAuthService } from "../../../interfaces/auth.interface";
import UserRepository from "../../account/repositories/user.repository";
import { generateJwtToken } from "../../../config/passport.config";

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
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user: { id: string; username: string; password: string } =
        await this.userRepository.findOne(
          `SELECT id, username, password FROM public.user WHERE username = $1`,
          [username]
        );

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = generateJwtToken({ sub: user.id });
      return {
        username: user.username,
        token,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {}
  }
}
