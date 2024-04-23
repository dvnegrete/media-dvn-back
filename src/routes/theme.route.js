const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getTheme, createTheme, updateTheme, deleteTheme, getThemeAll } = require("../controller/theme.controller");

const router = Router();

router.get('/', checkRoleCreator, getTheme);
router.get('/all', checkRoleCreator, getThemeAll);
router.post('/', checkRoleAdmin, createTheme);
router.put('/', checkRoleAdmin, updateTheme);
router.delete('/', checkRoleAdmin, deleteTheme);

module.exports = router;