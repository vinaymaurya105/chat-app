import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import mongoose from "mongoose";

const app = express();

dotenv.config();

async function main() {
  // connect db
  await connectDb();

  app.get("/", (req: any, res: any) => {
    res.send("Server is running");
  });

  app.listen(process.env.PORT, () =>
    console.log(`app was listening on  ${process.env.PORT}`)
  );
}

main().catch((err) => console.error(err.message));
