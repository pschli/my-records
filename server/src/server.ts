import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import type { Request, Response } from "express";

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
