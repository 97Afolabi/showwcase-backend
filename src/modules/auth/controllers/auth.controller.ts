import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import {
  IAuthController,
  IAuthService,
} from "../../../interfaces/auth.interface";
import { Request, Response } from "express";
import { TYPES } from "../../../config/types";

@controller("/auth")
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  @httpPost("/register")
  async register(req: Request, res: Response): Promise<any> {
    try {
      return await res.status(200).json({ data: req.body });
    } catch (error) {
      console.log("Method not implemented.");
    }
  }

  @httpPost("/login")
  async login(req: Request, res: Response): Promise<any> {
    try {
      return await this.authService.login(req, res);
    } catch (error) {
      console.log("Method not implemented.");
    }
  }
}
