import { Schema, model } from "mongoose";
import FacilityAddress from "./FacilityAddress";
import FacilityContact from "./FacilityContact";
import FacilityService from "./FacilityService";
import EMRSourceInstanceConfig from "./EMRSourceInstanceConfig";

const HealthFacility = model(
  "HealthFacility",
  new Schema({
    mfl_code: {
      unique: true,
      required: true,
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    level: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "HealthFacilityLevel",
    },
    primartType: {
      type: String,
      required: true,
    },
    secondaryTypes: {
      type: [String],
      default: [],
    },
    address: {
      type: FacilityAddress.schema,
      required: true,
    },
    contact: {
      type: FacilityContact.schema,
      required: true,
    },
    services: {
      type: [FacilityService.schema],
      default: [],
    },
    emrSourceInsanceConfig: {
      type: EMRSourceInstanceConfig.schema,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  })
);

export default HealthFacility;
