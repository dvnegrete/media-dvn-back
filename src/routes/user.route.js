const { Router } = require("express");
const { checkRoleAdmin } = require("../middleware/checkRole");
const { createUsers, getUsers, updateUsers,  deleteUsers, getUsersID } = require("../controller/user.controller");
const { checkEmail } = require("../middleware/checkEmail");

const router = Router();

router.get('/', checkRoleAdmin, getUsers);
router.get('/findUser',checkEmail, getUsersID);
router.post('/', checkEmail, createUsers);
router.put('/', checkRoleAdmin, updateUsers);
router.delete('/:id', checkRoleAdmin, deleteUsers);

module.exports = router;