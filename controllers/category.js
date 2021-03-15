import Category from "../models/categorySchema.js";

// @desc Get all Category
// @route Get /api/category
// @access public

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      note: "Get all post",
      categories,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc Get single  Category
// @route GET /api/category
// @access public

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      note: "Get post",
      category,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc Create New Category
// @route POST /api/category
// @access Private

const createNewCategory = async (req, res) => {
  try {
    const { name, alias, details, num } = req.body;
    if (!name) {
      res.status(400).send("No name given ");
    } else {
      const category = new Category({
        name,
        alias,
        details,
        num,
      });

      await category.save();
      res.status(201).json({
        note: "Category created",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc Update Category
// @route PUT /api/category
// @access Private

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    const { name, alias, details, num } = req.body;

    if (!name && !category && !alias && !details && !num) {
      res.status(400).send("Bad request or no category found");
    } else {
      category.name = name;
      category.alias = alias;
      category.details = details;
      category.num = num;

      await category.save();

      res.status(200).json({
        note: "Category Updated",
        success: true,
      });
    }
  } catch (error) {
    res.send(`errorName:${error.name},\n errorMessage: ${error.message}`);
  }
};

// @desc Delete New Category
// @route Delete /api/category/:id
// @access Private
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    !category
      ? res.status(400).json({
          message: "Category not found",
        })
      : res.status(200).json({
          message: "Category deleted",
        });
  } catch (error) {
    console.error(error);
  }
};

export {
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
};
