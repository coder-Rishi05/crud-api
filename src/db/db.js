import mongoose from "mongoose";
import { dbName } from "../constants/constant.js";
import dotenv from "dotenv";
dotenv.config();

const url = `${process.env.MONGO_COM_URL}${dbName}`;

// console.log(url);

const connectDb = async () => {
  try {
    mongoose
      .connect(url)
      .then((data) => console.log("db connection successfull"))
      .catch((err) => console.log("error connecting"));
  } catch (error) {
    console.log("server error", error);
  }
};

export default connectDb;
