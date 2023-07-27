import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

interface ValidationError {
  field: string;
  message: string;
}

export function UserAuth(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(10).required(),
  });

  validateRequestBody(schema, req, res, next);
}

export function ValidateEducation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object({
    school: Joi.string().required(),
    degree: Joi.string().required(),
    field: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional(),
    grade: Joi.number().required(),
    description: Joi.string().required(),
  });

  validateRequestBody(schema, req, res, next);
}

function validateRequestBody(
  schema,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const validationErrors: ValidationError[] = error.details.map((detail) => ({
      field: detail.path.join("."),
      message: detail.message,
    }));

    return res.status(422).json({
      message: "Validation failed",
      errors: validationErrors,
    });
  }

  next();
}
