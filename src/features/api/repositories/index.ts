import { Request } from "express";
import { HealthFacility } from "../../facilities/data/models";
import axios, { AxiosError } from "axios";
import { configuration } from "../../../utils";

const getFacilityByMFLCode = async (mflCode: string) => {
  const facility = await HealthFacility.findOne({ mflCode });
  if (!facility)
    throw {
      status: 403,
      errors: {
        detail: "Invalid facility or Facility not registered with nishauri",
      },
    };
  return facility;
};

const getFacilityEMRInstanceConfig = async (mflCode: string) => {
  const facility = await getFacilityByMFLCode(mflCode);
  return facility.emrSourceInsanceConfig;
};

const proxy = async (req: Request) => {
  try {
    const mflCode = req.params.mflCode;
    const emrInstance = await getFacilityEMRInstanceConfig(mflCode);
    const resource = req.params["0"];
    const url = new URL(
      `https://${emrInstance.host}:${emrInstance.port}/${configuration.emrRestPath}/${resource}`
    );
    url.href;
    const Authorization = `Basic ${Buffer.from(
      `${emrInstance.accessUsername}:${emrInstance.accessPassword}`
    ).toString("base64")}`;
    const response = await axios({
      url: url.href,
      method: req.method,
      data: req.body,
      maxBodyLength: Infinity,
      params: req.query,
      headers: {
        Authorization,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response)
        throw {
          status: axiosError.response.status,
          errors: { detail: (axiosError.response.data as any).error.message },
        };
      throw {
        status: axiosError.status,
        errors: { detail: axiosError.message },
      };
    } else if (error.status) {
      throw error;
    }
    throw {
      status: 500,
      errors: { detail: error.message },
    };
  }
};

export default {
  getFacilityByMFLCode,
  getFacilityEMRInstanceConfig,
  proxy,
};
