const express = require("express");
const {
  createProductController,
  allProductsController,
  singleProductController,
  deleteProductController,
  updateProductController,
} = require("../../controllers/productController");
const upload = require("../../helpers/sendImage");
const router = express.Router();

//localhost:7878/api/v1/product/createProduct
router.post("/createProduct", upload.array("images"), createProductController);

//localhost:7878/api/v1/product/allProducts
router.get("/allProducts", allProductsController);

//localhost:7878/api/v1/product/singleProduct/
router.get("/singleProduct/:id", singleProductController);

//localhost:7878/api/v1/product/deleteProduct/
router.delete(
  "/deleteProduct/:id",
  upload.array("images"),
  deleteProductController
);

//localhost:7878/api/v1/product/updateProduct/
router.patch(
  "/updateProduct/:id",
  upload.array("images"),
  updateProductController
);

module.exports = router;
