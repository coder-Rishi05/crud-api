import express from "express";
import dotenv from "dotenv";
import { PORT } from "./src/constants/constant.js";
import connectDb from "./src/db/db.js";

await connectDb();
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hi from the server");
  console.log("Hi from the server");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Serevr running at port : ${process.env.PORT || PORT} `);
  console.log(
    `visit this site at : http://localhost:${process.env.PORT || PORT}/`
  );
});
