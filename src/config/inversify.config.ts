import { Container } from "inversify";
import { IAuthController, IAuthService } from "../interfaces/auth.interface";
import AuthService from "../modules/auth/services/auth.service";
import { AuthController } from "../modules/auth/controllers/auth.controller";
import UserRepository from "../modules/account/repositories/user.repository";
import { TYPES } from "./types";
import { BaseRepository } from "./base-repository";

const container = new Container();
container.bind<BaseRepository>(BaseRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthController>("AuthController").to(AuthController);

export default container;
