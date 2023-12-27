import express from "express";

const app = express();

const PORT = 4002;

app.get("/", (req: any, res: any) => {
  res.send("Server is running");
});

app.listen(PORT, () => console.log(`app was listening on  ${PORT}`));
