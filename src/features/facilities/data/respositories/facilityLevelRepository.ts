import { z } from "zod";
import { HealthFacility, HealthFacilityLevel } from "../models";
import { FacilitySchema } from "../../presentation";

const getFacilityLevels = async () => {
  return await HealthFacility.find({ published: true });
};

const registerFacilityLevel = async (data: z.infer<typeof FacilitySchema>) => {
  /**
   * Ensure facility is valid
   * create facility
   * Return fcility
   */
  if (!(await HealthFacilityLevel.findById(data.level))) {
    throw {
      status: 400,
      errors: { level: { _errors: ["Invalid facility level"] } },
    };
  }
  const facility = new HealthFacility(data);
  await facility.save();
  return facility;
};

export default {
  registerFacilityLevel,
  getFacilityLevels,
};
