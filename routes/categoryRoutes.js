import express from "express";
import {
  createNewCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

router.route("/").get(getCategory).post(createNewCategory);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
