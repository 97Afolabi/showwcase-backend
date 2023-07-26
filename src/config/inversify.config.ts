import { Container } from "inversify";
import { IAuthController, IAuthService } from "../interfaces/auth.interface";
import AuthService from "../modules/auth/services/auth.service";
import { AuthController } from "../modules/auth/controllers/auth.controller";
import UserRepository from "../modules/account/repositories/user.repository";
import { IUserRepository } from "../interfaces/account.interface";
import { TYPES } from "./types";

const container = new Container();

container.bind<IUserRepository>("UserRepository").to(UserRepository);
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthController>("AuthController").to(AuthController);

export default container;
