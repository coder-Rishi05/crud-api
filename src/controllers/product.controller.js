import Product from "../models/product.model.js";

export const getData = (req, res) => {
  res.send("Hi from the server");
  console.log("Hi from the server");
};

export const postData = async (req, res) => {
  try {
    const { name, quantity, price, image } = await req.body;

    console.log(req.body); // it will contain the data of user which he write in json so we dont need to destructure it.

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
};

export const getAllData = async (req, res) => {
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
};

export const getItembyId = async (req, res) => {
  try {
    const id = req.params.id;
    console.dir(req.params);

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
};

export const updateItembyId = async (req, res) => {
  try {
    const { name, quantity, price } = await req.body;

    if (!name || !quantity || !price )
      return res.status(403).json({ message: "All feilds are necessary" });

    const id = req.params.id;

    if (!id) return res.status(404).json({ message: "Id not found" });

    const updatedData = await Product.findByIdAndUpdate(id, {
      name: name,
      quantity: quantity,
      price: price,
    });

    // console.log(updatedData);

    const newData = await Product.findById(id);

    return res
      .status(201)
      .json({ message: "data updated sucessfully", newData });
  } catch (error) {
    return res.status(501).json({ message: "Server error" });
  }
};

export const deleteItem = async (req, res) => {
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
};
