import { Schema, model } from "mongoose";

const HealthFacilityLevel = model(
  "HealthFacilityLevel",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: true,
    },
  })
);

export default HealthFacilityLevel;
