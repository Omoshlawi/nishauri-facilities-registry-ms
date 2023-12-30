import { NextFunction, Request, Response } from "express";
import { facilityLevelRepository } from "../../data/respositories";
import { FacilityLevelSchema } from "../../presentation";
import { APIException } from "../../../../shared/exceptions";

export const getFacilityLevels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json({
      results: await facilityLevelRepository.getFacilityLevels(),
    });
  } catch (error) {
    next(error);
  }
};

export const createFacilityLevel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = await FacilityLevelSchema.safeParseAsync(req.body);
    if (!validation.success)
      throw new APIException(400, validation.error.format());
    return res.json(await facilityLevelRepository.registerFacilityLevel(validation.data))
  } catch (error) {
    next(error);
  }
};
