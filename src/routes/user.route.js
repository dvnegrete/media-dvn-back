const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { createUsers, getUsers, deleteUsers } = require("../controller/user.controller");

const router = Router();

router.get('/', getUsers);
router.post('/', checkRoleAdmin, createUsers);
router.delete('/', checkRoleAdmin, deleteUsers);

module.exports = router;