import { z } from "zod";
import { HealthFacility, HealthFacilityLevel } from "../models";
import { FacilitySchema } from "../../presentation";
import { isEmpty } from "lodash";
import { dbHelpers, securityHelpers } from "../../../../utils";

const getFacilities = async (search?: any) => {
  return await HealthFacility.aggregate([
    dbHelpers.simpleSearch(
      search,
      ["mflCode", "name", "contact.phone"],
      ["mflCode", "contact.phone"]
    ),
  ]);
};

const registerFacility = async (data: z.infer<typeof FacilitySchema>) => {
  /**
   * Ensure no other facility with mfl code
   * Ensure facilitylevel is valid
   * create facility
   * Return fcility
   */
  const errors: any = {};

  if (await HealthFacility.findOne({ mflCode: data.mflCode }))
    errors["mflCode"] = {
      _errors: ["Anoter facility with similar mfl code already exists"],
    };
  if (!(await HealthFacilityLevel.findById(data.level))) {
    errors["level"] = { _errors: ["Invalid facility level"] };
  }

  if (!isEmpty(errors)) {
    throw {
      status: 400,
      errors,
    };
  }
  const facility = new HealthFacility({
    ...data,
    emrSourceInsanceConfig: {
      ...data.emrSourceInsanceConfig,
      accessUsername: securityHelpers.encrypt(
        data.emrSourceInsanceConfig.accessUsername
      ),
      accessPassword: securityHelpers.encrypt(
        data.emrSourceInsanceConfig.accessPassword
      ),
    },
  });
  await facility.save();
  return facility;
};

export default {
  registerFacility,
  getFacilities,
};
