import { Schema, model } from "mongoose";

const FacilityService = model(
  "FacilityService",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
  })
);

export default FacilityService
