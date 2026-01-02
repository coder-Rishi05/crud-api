import express from "express";
import dotenv from "dotenv";
import { PORT } from "./src/constants/constant.js";
import connectDb from "./src/db/db.js";
import Product from "./src/models/product.model.js";

await connectDb();
dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi from the server");
  console.log("Hi from the server");
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, quantity, price, image } = await req.body;

    if (!name || !quantity || !price || !image) {
      return res.status(404).json({ message: "All feilds are necessary" });
    }

    const createProduct = await Product.create({
      name,
      quantity,
      price,
      image,
    });

    return res.status(201).json({
      message: "data received successfully",
      data: {
        name: createProduct.name,
        quantity: createProduct.quantity,
        price: createProduct.price,
        image: createProduct.image,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "server error" });
    console.log(error);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Serevr running at port : ${process.env.PORT || PORT} `);
  console.log(
    `visit this site at : http://localhost:${process.env.PORT || PORT}/`
  );
});
