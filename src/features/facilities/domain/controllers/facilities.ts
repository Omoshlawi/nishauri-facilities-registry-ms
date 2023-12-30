import { NextFunction, Request, Response } from "express";
import { facilitiesRepository } from "../../data/respositories";
import path from "path/posix";
import { FACILITY_MEDIA_URL, objectToFormData } from "../../../../utils";
import { FacilitySchema } from "../../presentation";
import { APIException } from "../../../../shared/exceptions";
export const getFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const facilities = await facilitiesRepository.getFacilities(
      req.query?.search
    );
    return res.json({ results: facilities });
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = {
      ...req.body,
      images: Array.from(
        (req.files as Express.Multer.File[] | undefined) ?? []
      ).map(({ filename }) => path.join(FACILITY_MEDIA_URL, filename)),
    };

    const validation = await FacilitySchema.safeParseAsync(body);
    if (!validation.success)
      return res.status(400).json(validation.error.format());
    // throw new APIException(400, validation.error.format());
    return res.json(
      await facilitiesRepository.registerFacility(validation.data)
    );
  } catch (error) {
    next(error);
  }
};
