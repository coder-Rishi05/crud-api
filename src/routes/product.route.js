import { Router } from "express";
import {
  getData,
  postData,
  getAllData,
  getItembyId,
  updateItembyId,
  deleteItem,
} from "../controllers/product.controller.js";
const router = Router();

// Home route
router.route("/").get(getData);

// post data

router.route("/products").post(postData);

// // get all posts
router.route("/products").get(getAllData);

// // get item by id
router.route("/products/:id").get(getItembyId);

// // update item by id
router.route("/products/:id").put(updateItembyId);

// // delete product

router.route("/products/:id").delete(deleteItem);

export default router;
