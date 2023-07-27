import { NextFunction, Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import * as passport from "passport";
import { TYPES } from "../../../config/types";
import AuthService from "../services/education.service";
import EducationService from "../services/education.service";
import { ValidateEducation, ValidateUuid } from "../../../common/validation";

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

  @httpGet("/")
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const data = await this.educationService.findAll(req["user"].id);
    return res.status(200).json({ message: "Education history", data });
  }

  @httpGet("/:id", ValidateUuid)
  async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const data = await this.educationService.findOne(
      req["user"].id,
      req.params.id
    );
    return res.status(200).json({ message: "Education history", data });
  }
}
