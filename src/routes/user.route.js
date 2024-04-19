const { Router } = require("express");
const { checkRoleAdmin } = require("../middleware/checkRole");
const { createUsers, getUsers, updateUsers,  deleteUsers } = require("../controller/user.controller");

const router = Router();

router.get('/', getUsers);
router.post('/', checkRoleAdmin, createUsers);
router.put('/', checkRoleAdmin, updateUsers);
router.delete('/', checkRoleAdmin, deleteUsers);

module.exports = router;