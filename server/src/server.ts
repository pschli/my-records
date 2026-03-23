import dotenv from "dotenv";
import express, { response } from "express";
import mongoose from "mongoose";
import type { Request, Response } from "express";
import { Record } from "./models/recordModel.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined");
}

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API running with TypeScript");
});

app.post("/records", async (req: Request, res: Response) => {
  try {
    if (!req.body.artist || !req.body.title) {
      return res.status(400).send({
        message: "Send all required fields: Artist, Title!",
      });
    }
    const newRecord = {
      artist: req.body.artist,
      title: req.body.title,
      releaseYear: req.body.releaseYear ? req.body.releaseYear : undefined,
      tracks: req.body.tracks.length > 0 ? req.body.tracks : [],
    };
    const record = await Record.create(newRecord);

    return res.status(201).send(record);
  } catch (error) {
    let errorMessage = "Failed to save record";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(error);
    response.status(500).send({ message: errorMessage });
  }
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to DB.");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
