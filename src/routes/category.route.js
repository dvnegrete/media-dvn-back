const { Router } = require("express");
const { checkRole, checkRoleAdmin } = require("../middleware/checkRole");
const { getCategory } = require("../controller/category.controller");

const router = Router();

router.get('/', checkRole, getCategory)
router.post('/', checkRoleAdmin, )

module.exports = router;