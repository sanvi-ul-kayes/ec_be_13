const express = require("express");
const createCartController = require("../../controllers/cartController");
const router = express.Router();

//localhost:7878/api/v1/cart/createCart
router.post("/createCart", createCartController);

module.exports = router;
