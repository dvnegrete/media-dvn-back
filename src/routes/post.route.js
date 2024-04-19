const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { getPost, createPost, deletePost } = require("../controller/post.controller");
const { contentPermissions } = require("../middleware/checkContentPermissions");

const router = Router();

router.get('/', getPost);
router.post('/', checkRoleCreator, contentPermissions, createPost);
router.delete('/', checkRoleAdmin, deletePost);

// format JSON post: 
// {
// 	"title": "Titulo de prueba",
// 	"content": "lorem ipsum dolor",
// 	"category": "imagenes",
// 	"media": [
// 		{
// 			"file":"archivo file",
// 			"url": "https..",
// 			"allowedFileTypes": "image/jpeg"
// 		}
// 	]
// }

module.exports = router;