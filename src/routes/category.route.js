const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getCategory, createCategory, deleteCategory } = require("../controller/category.controller");

const router = Router();

router.get('/', checkRoleCreator, getCategory);
router.post('/', checkRoleAdmin, createCategory);
router.delete('/', checkRoleAdmin, deleteCategory);

module.exports = router;