import { Schema, model } from "mongoose";

const User = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  })
);

export default User
