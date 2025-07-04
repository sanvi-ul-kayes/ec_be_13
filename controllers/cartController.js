const cartSchema = require("../dbSchema/cartSchema");

//localhost:7878/api/v1/cart/createCart
async function createCartController(req, res) {
  let { price, quantity, product, user } = req.body;
  try {
    if (!price || !quantity || !product || !user) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const createCart = new cartSchema({ price, quantity, product, user });
      await createCart.save();
      res.status(201).send({
        success: true,
        msg: "Product add to Cart successfully",
        data: createCart,
      });
    }
  } catch (error) {
    res.status(404).send({ data: error });
  }
}

//localhost:7878/api/v1/cart/singleUserCart
async function singleUserCartController(req, res) {
  let { userId } = req.params;
  try {
    const singleUserCart = await cartSchema.findOne({ user: userId });
    res.status(200).send({
      success: true,
      msg: "Single User Cart is successfully fetched",
      data: singleUserCart,
    });
  } catch (error) {
    res.status(404).send({ data: error ? error : "Can't fetch" });
  }
}
module.exports = { createCartController, singleUserCartController };
