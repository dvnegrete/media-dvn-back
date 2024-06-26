const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getTheme, createTheme, updateTheme, deleteTheme, getThemeAll } = require("../controller/theme.controller");

const router = Router();

router.get('/all', getThemeAll);
router.get('/:id', checkRoleCreator, getTheme);
router.get('/', checkRoleCreator, getTheme);
router.post('/', checkRoleAdmin, createTheme);
router.put('/', checkRoleAdmin, updateTheme);
router.delete('/', checkRoleAdmin, deleteTheme);

module.exports = router;