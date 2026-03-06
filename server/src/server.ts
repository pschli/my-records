import express from "express";
import type { Request, Response } from "express";

const USER = process.env.USER;
const PW = process.env.PW;

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API running with TypeScript");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
