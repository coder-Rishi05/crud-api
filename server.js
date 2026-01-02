import express from "express";
import dotenv from "dotenv";
import { PORT } from "./src/constants/constant.js";
import connectDb from "./src/db/db.js";
import Product from "./src/models/product.model.js";

dotenv.config();
await connectDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false})) // this is used for to decode formdata

app.get("/", (req, res) => {
  res.send("Hi from the server");
  console.log("Hi from the server");
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, quantity, price, image } = await req.body;

    console.log(req.body);

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
    res.status(501).json({ message: "server error" });
    console.log(error);
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const Products = await Product.find();
    return res.status(201).json({
      message: "data received sucessfully",
      Products,
    });
  } catch (error) {
    res.status(501).json({ message: "server error" });
    console.log(error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);

    const data = await Product.findById(id);

    if (!data) return res.status(404).json({ message: "product not found" });
    return res.status(201).json({
      message: "item found sucessfully",
      data,
    });
  } catch (error) {
    res.status(501).json({ message: "server error" });
    console.log(error);
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, quantity, price, image } = await req.body;

    if (!name || !quantity || !price || !image)
      return res.status(403).json({ message: "All feilds are necessary" });

    const id = req.params.id;

    if (!id) return res.status(404).json({ message: "Id not found" });

    const updatedData = await Product.findByIdAndUpdate(id, {
      name: name,
      quantity: quantity,
      price: price,
      image: image,
    });

    // console.log(updatedData);

    const newData = await Product.findById(id);

    return res
      .status(201)
      .json({ message: "data updated sucessfully", newData });
  } catch (error) {
    return res.status(501).json({ message: "Server error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) return res.status(404).json({ message: "item not found" });
    const product = await Product.findByIdAndDelete(id);

    return res
      .status(201)
      .json({ message: "product deleted sucessfully", product });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "server error check console" });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Serevr running at port : ${process.env.PORT || PORT} `);
  console.log(
    `visit this site at : http://localhost:${process.env.PORT || PORT}/`
  );
});
