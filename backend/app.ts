import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = 4002;

async function main() {
  await mongoose.connect("mongodb://localhost:27017", { dbName: "chatapp" });

  app.get("/", (req: any, res: any) => {
    res.send("Server is running");
  });

  app.listen(PORT, () => console.log(`app was listening on  ${PORT}`));
}

main();
