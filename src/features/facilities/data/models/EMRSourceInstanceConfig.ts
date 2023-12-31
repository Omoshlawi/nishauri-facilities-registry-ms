import { Schema, model } from "mongoose";

const EMRSourceInstanceConfig = model(
  "SourceInstance",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    port: {
      type: Number,
      required: true,
    },
    accessCredentials: {
      type: String,
      required: true,
    },
  })
);

export default EMRSourceInstanceConfig;
