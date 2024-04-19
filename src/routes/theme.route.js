const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getTheme, createTheme, updateTheme, deleteTheme } = require("../controller/theme.controller");

const router = Router();

router.get('/', checkRoleCreator, getTheme);
router.post('/', checkRoleAdmin, createTheme);
router.put('/', checkRoleAdmin, updateTheme);
router.delete('/', checkRoleAdmin, deleteTheme);

module.exports = router;