import { NextFunction, Request, Response } from "express";
import repositories from "../repositories";

export const proxyFacilityEMRInstance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await repositories.proxy(req);
    return res.json(response);
  } catch (error: any) {
    return res.status(error.status).send(error.errors);
  }
};
