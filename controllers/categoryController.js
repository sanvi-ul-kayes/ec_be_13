const categorySchema = require("../dbSchema/categorySchema");
const fs = require("fs");
const path = require("path");

//localhost:7878/api/v1/category/createCategory
async function createCategoryController(req, res) {
  try {
    let { name, description } = req.body;
    const images = req.file.filename;

    const createCategory = new categorySchema({
      name,
      description,
      image: process.env.LOCAL_HOST + images,
    });
    await createCategory.save();
    res.status(201).send({
      success: true,
      msg: "category created successfully",
      data: createCategory,
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}

// localhost:7878/api/v1/category/deleteCategory
async function deleteCategoryController(req, res) {
  let { id } = req.params;
  try {
    const deleteCategory = await categorySchema.findOneAndDelete({ _id: id });
    const categoryImage = deleteCategory.image.split("/").pop();

    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${categoryImage}`,
      (err) => {
        if (err) {
          res.status(500).send({ success: false, err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category Deleted successfully",
            data: deleteCategory,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}

// localhost:7878/api/v1/category/updateCategory
async function updateCategoryController(req, res) {
  let { id } = req.params;
  let { name, description } = req.body;
  let image = req.file;
  let { filename } = image;
  try {
    const updateCategory = await categorySchema.findOneAndUpdate(
      { _id: id },
      { name, description, image: process.env.LOCAL_HOST + filename }
    );
    const updateCategoryImage = updateCategory.image.split("/").pop();
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${updateCategoryImage}`,
      (err) => {
        if (err) {
          res.status(500).send({ success: false, err });
        } else {
          res.status(200).send({
            success: true,
            msg: "Category updated successfully",
            data: updateCategory,
          });
        }
      }
    );
    console.log(updateCategoryImage);
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}

//localhost:7878/api/v1/category/allCategory
async function allCategoryController(req, res) {
  try {
    const category = await categorySchema.find();
    res.send(category);
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}
//localhost:7878/api/v1/category/singleCategory
async function singleCategoryController(req, res) {
  try {
    let { id } = req.params;
    const category = await categorySchema.findOne({ _id: id });
    console.log(category);
    const categoryImage = category;
    console.log(categoryImage);
  } catch (error) {
    res.status(500).send({ success: false, msg: "Invalid credantial", error });
  }
}
module.exports = {
  createCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController,
  updateCategoryController,
};
