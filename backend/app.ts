import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import router from "./src/routes";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({ origin: "*" }));

async function main() {
  // connect to database
  await connectDb();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (req: any, res: any) => {
    res.send("Server is running");
  });

  // routes
  app.use("/", router);

  app.listen(process.env.PORT, () =>
    console.log(`app was listening on  ${process.env.PORT}`)
  );
}

main().catch((err) => console.error(err.message));
