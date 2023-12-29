import { Schema, model } from "mongoose";

const FacilityContact = model(
  "FacilityContact",
  new Schema({
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null
    },
  })
);

export default FacilityContact;
