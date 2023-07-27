import { NextFunction, Request, Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import * as passport from "passport";
import { TYPES } from "../../../config/types";
import AuthService from "../services/education.service";
import EducationService from "../services/education.service";
import { ValidateEducation } from "../../../common/validation";

const jwtAuthMiddleware = passport.authenticate("jwt", {
  session: false,
});

@controller("/education", jwtAuthMiddleware)
export class EducationController {
  constructor(
    @inject(EducationService) private educationService: EducationService
  ) {}

  @httpPost("/", ValidateEducation)
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    await this.educationService.create({
      user_id: req["user"].id,
      ...req.body,
    });
    return res
      .status(200)
      .json({ message: "Education history saved successfully" });
  }
}
