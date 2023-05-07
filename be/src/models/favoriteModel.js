import mongoose, { Schema } from "mongoose";
import modelOptions from "./options";

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
    mediaRate: {
      type: Number,
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true,
    },
  },
  modelOptions
);

export default mongoose.model("Favorite", favoriteSchema);
