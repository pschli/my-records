import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  artist: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    min: 1900,
    max: 2030,
  },
  tracks: [
    {
      name: { type: String, required: true },
      length: { type: Number, min: 0, max: 14400 },
    },
  ],
});

export const Record = mongoose.model("Record", recordSchema);
