const productSchema = require("../dbSchema/productSchema");
const fs = require("fs");
const path = require("path");

//localhost:7878/api/v1/product/createProduct
async function createProductController(req, res) {
  try {
    let {
      description,
      name,
      discountPrice,
      sellingPrice,
      rating,
      review,
      store,
      category,
    } = req.body;
    console.log(req.body);
    const images = req.files.map((item) => item.filename);
    const products = new productSchema({
      description,
      name,
      discountPrice,
      sellingPrice,
      rating,
      review,
      store,
      category,
      image: images,
    });
    await products.save();
    res.status(201).send({
      success: true,
      msg: "Product is created successfully",
      data: products,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      msg: "Product is required",
      data: error,
    });
  }
}

//localhost:7878/api/v1/product/allProducts
async function allProductsController(req, res) {
  try {
    const allProducts = await productSchema.find();
    res.status(200).send({
      success: true,
      msg: "All product fetch successful",
      data: allProducts,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      msg: "Product is required",
      data: error,
    });
  }
}

//localhost:7878/api/v1/product/singleProduct/
async function singleProductController(req, res) {
  let { id } = req.params;
  try {
    const singleProduct = await productSchema.findOne({ _id: id });
    res.send(singleProduct);
  } catch (error) {
    res.status(404).send({
      success: false,
      msg: "Product is required",
      data: error,
    });
  }
}

//localhost:7878/api/v1/product/deleteProduct/
async function deleteProductController(req, res) {
  let { id } = req.params;
  const deleteProduct = await productSchema.findOneAndDelete({ _id: id });

  const imageArray = deleteProduct.image.map((item) => item);
  imageArray.forEach((element) => {
    const imagePathArray = element;
    try {
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${imagePathArray}`,
        (err) => {
          if (err) {
            res.status(500).send({
              success: false,
              msg: "Image delete unsuccessful",
              data: err,
            });
          } else {
            res.status(200).send({
              success: true,
              msg: "Product Deleted Successful",
              data: deleteProduct,
            });
          }
        }
      );
    } catch (error) {
      res.status(404).send({
        success: false,
        msg: "Product is required",
        data: error,
      });
    }
  });
}

//localhost:7878/api/v1/product/updateProduct/
async function updateProductController(req, res) {
  let { id } = req.params;
  let { name, description } = req.body;
  const images = req.files.map(
    (item) => process.env.LOCAL_HOST + item.filename
  );
  try {
    const updateProduct = await productSchema.findOneAndUpdate(
      { _id: id },
      { name, description, image: images }
    );
    const oldProductImage = updateProduct.image;

    oldProductImage.forEach((element) => {
      const oldProductImageArray = element.split("/").pop();
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldProductImageArray}`,
        (err) => {
          if (err) {
            res.status(500).send({
              success: false,
              msg: "Image delete unsuccessful",
              data: err,
            });
          } else {
            res.status(200).send({
              success: true,
              msg: "Product updated Successful",
              data: updateProduct,
            });
          }
        }
      );
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      msg: "Product is required",
      data: error,
    });
  }
}

module.exports = {
  createProductController,
  allProductsController,
  singleProductController,
  deleteProductController,
  updateProductController,
};
