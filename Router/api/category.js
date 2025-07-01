const express = require("express");
const {
  createCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController,
  updateCategoryController,
} = require("../../controllers/categoryController");
const router = express.Router();
const upload = require("../../helpers/sendImage");

//localhost:7878/api/v1/category/createCategory
router.post(
  "/createCategory",
  upload.single("image"),
  createCategoryController
);

//localhost:7878/api/v1/category/updateCategory
router.patch(
  "/updateCategory/:id",
  upload.single("image"),
  updateCategoryController
);
//localhost:7878/api/v1/category/deleteCategory
router.delete(
  "/deleteCategory/:id",
  upload.single("image"),
  deleteCategoryController
);

//localhost:7878/api/v1/category/allCategory
router.get("/allCategory", allCategoryController);

//localhost:7878/api/v1/category/singleCategory
router.get("/singleCategory/:id", singleCategoryController);

module.exports = router;
