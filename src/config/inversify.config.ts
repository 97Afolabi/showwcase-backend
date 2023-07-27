import { Container } from "inversify";
import { TYPES } from "./types";
import { IAuthController, IAuthService } from "../interfaces/auth.interface";

import { BaseRepository } from "./base-repository";
import EducationRepository from "../modules/education-history/repositories/education.repository";
import UserRepository from "../modules/account/repositories/user.repository";

import AuthService from "../modules/auth/services/auth.service";
import EducationService from "../modules/education-history/services/education.service";

import { AuthController } from "../modules/auth/controllers/auth.controller";
import { EducationController } from "../modules/education-history/controllers/education.controller";

const container = new Container();
container.bind<BaseRepository>(BaseRepository).toSelf();
container.bind<EducationRepository>(EducationRepository).toSelf();
container.bind<UserRepository>(UserRepository).toSelf();
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container.bind<IAuthController>("AuthController").to(AuthController);
container.bind<EducationService>(EducationService).toSelf().inSingletonScope();
container
  .bind<EducationController>(EducationController)
  .toSelf()
  .inSingletonScope();

export default container;
