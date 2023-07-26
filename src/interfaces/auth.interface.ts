import { Request, Response } from "express";

export interface IRegister extends ILogin {
  is_active: boolean;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthController {
  register(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
}

export interface IAuthService {
  register(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
}
