const { Router } = require("express");
const { checkRoleAdmin} = require("../middleware/checkRole");
const { checkEmail } = require("../middleware/checkEmail");
const { createUsers, getUsers, updateUsers,  deleteUsers, getUsersID } = require("../controller/user.controller");

const router = Router();

router.get('/findUser',checkEmail, getUsersID);
router.get('/', checkRoleAdmin, getUsers);
router.post('/', checkEmail, createUsers);
router.put('/', checkRoleAdmin, updateUsers);
router.delete('/:id', checkRoleAdmin, deleteUsers);

module.exports = router;