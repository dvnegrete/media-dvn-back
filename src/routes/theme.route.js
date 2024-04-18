const { Router } = require("express");
const { checkRole, checkRoleAdmin } = require("../middleware/checkRole");
const { createTheme } = require("../controller/theme.controller");

const router = Router();

//router.get('/', checkRole, getTheme);
router.post('/', checkRoleAdmin, createTheme);

module.exports = router;