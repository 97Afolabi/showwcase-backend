import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { TYPES } from "../../../config/types";
import { IAuthController } from "../../../interfaces/auth.interface";
import AuthService from "../services/auth.service";

@controller("/auth")
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  @httpPost("/register")
  async register(req: Request, res: Response): Promise<any> {
    try {
      return await this.authService.register(req, res);
    } catch (error) {
      return res.status(400).json({ message: "User registration failed" });
    }
  }
  login(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
