import { z } from "zod";
import { HealthFacility, HealthFacilityLevel } from "../models";
import { FacilityLevelSchema } from "../../presentation";

const getFacilityLevels = async () => {
  return await HealthFacilityLevel.find();
};

const registerFacilityLevel = async (
  data: z.infer<typeof FacilityLevelSchema>
) => {
  /**
   * Ensure no other level with same level
   * Create facility level
   * Return fcility
   */
  if (await HealthFacilityLevel.findOne({ level: data.level }))
    throw {
      status: 400,
      errors: { level: { _errors: ["Level already exists"] } },
    };
  const facilityLevel = new HealthFacilityLevel(data);
  await facilityLevel.save();
  return facilityLevel;
};

export default {
  registerFacilityLevel,
  getFacilityLevels,
};
