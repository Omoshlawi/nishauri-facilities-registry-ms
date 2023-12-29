import { Schema, model } from "mongoose";
import User from "./User";

const Review = model(
  "Review",
  new Schema({
    facility: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: User.schema,
      required: true,
    },
    rating: {
      type: Number,
      default: 3,
    },
    comment: {
      type: String,
      required: true,
    },
  })
);

export default Review;
