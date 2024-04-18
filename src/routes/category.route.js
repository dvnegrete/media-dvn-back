const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getCategory, createCategory } = require("../controller/category.controller");

const router = Router();

router.get('/', checkRoleCreator, getCategory)
router.post('/', checkRoleAdmin, createCategory)

module.exports = router;