import { Schema, model } from "mongoose";

const FacilityAddress = model(
  "FacilityAddress",
  new Schema({
    country: {
      type: String,
      required: true,
    },
    county: {
      type: String,
      required: true,
    },
    subcounty: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  })
);

export default FacilityAddress;
