import { NextFunction, Request, Response } from "express";
import { APIException } from "../shared/exceptions";
import { entries } from "lodash";

export function handleErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.status) {
    return res.status(error.status).json(
      error.status === 400
        ? {
            errors: entries(error.errors).reduce((prev, [key, value]) => {
              if (key === "_errors") return { ...prev, [key]: value };
              return {
                ...prev,
                [key]: ((value as any)._errors as string[]).join(", "),
              };
            }, {}),
          }
        : error.errors
    );
  }

  if (error.errors) {
    const status = 400;
    const validationErrors: any = {};
    // Mongo db validation
    const _errors: any = {};
    for (const field in error.errors) {
      _errors[error.errors[field].path] = error.errors[field].message;
    }
    validationErrors.errors = _errors;
    return res.status(status).json({ validationErrors });
  }
  // For other types of errors, return a generic error response
  console.error("[*]Error handler middleware: ", error.message);

  return res.status(500).json({ detail: "Internal Server Error" });
}

export default handleErrors;
