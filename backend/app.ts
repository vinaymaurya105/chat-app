import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import router from "./src/routes";

const app = express();

dotenv.config();

async function main() {
  // connect database
  await connectDb();

  app.use(express.json());

  // routes
  app.use("/", router);

  app.get("/health", (req: any, res: any) => {
    res.send("Server is running");
  });

  app.listen(process.env.PORT, () =>
    console.log(`app was listening on  ${process.env.PORT}`)
  );
}

main().catch((err) => console.error(err.message));
