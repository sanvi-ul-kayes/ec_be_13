const express = require("express");
const {
  createCartController,
  singleUserCartController,
} = require("../../controllers/cartController");
const router = express.Router();

//localhost:7878/api/v1/cart/createCart
router.post("/createCart", createCartController);

//localhost:7878/api/v1/cart/singleUserCart
router.get("/singleUserCart/:userId", singleUserCartController);

module.exports = router;
