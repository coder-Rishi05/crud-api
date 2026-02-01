import express from "express";
import dotenv from "dotenv";
import { PORT } from "./src/constants/constant.js";
import connectDb from "./src/db/db.js";
import router from "./src/routes/product.route.js";

dotenv.config();
await connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // this is used for to decode formdata

app.use("/api", router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Serevr running at port : ${process.env.PORT || PORT} `);
  console.log(
    `visit this site at : http://localhost:${process.env.PORT || PORT}/`,
  );
});
