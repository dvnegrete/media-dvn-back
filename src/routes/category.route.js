const { Router } = require("express");
const { checkRoleAdmin } = require("../middleware/checkRole");
const { getCategory, createCategory, deleteCategory } = require("../controller/category.controller");

const router = Router();

router.get('/', getCategory);
router.post('/', checkRoleAdmin, createCategory);
router.delete('/', checkRoleAdmin, deleteCategory);

module.exports = router;