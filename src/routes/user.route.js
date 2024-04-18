const { Router } = require("express");
const { checkRole, checkRoleAdmin } = require("../middleware/checkRole");
const { createUsers, getUsers, deleteUsers } = require("../controller/user.controller");

const router = Router();

router.get('/', getUsers);
router.post('/', checkRoleAdmin, createUsers);
router.delete('/', checkRoleAdmin, deleteUsers);

module.exports = router;