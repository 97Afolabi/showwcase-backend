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

  validateRequest(schema, req, res, next);
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

  validateRequest(schema, req, res, next);
}

export function ValidateUuid(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
  });

  validateRequest(schema, req, res, next, "params");
}

function validateRequest(
  schema,
  req: Request,
  res: Response,
  next: NextFunction,
  inputType?: "params" | "query"
) {
  let validateSchema;
  switch (inputType) {
    case "params":
      validateSchema = schema.validate(req.params, { abortEarly: false });
      break;
    case "query":
      validateSchema = schema.validate(req.query, { abortEarly: false });
    default:
      validateSchema = schema.validate(req.body, { abortEarly: false });
      break;
  }

  const error = validateSchema.error;
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
