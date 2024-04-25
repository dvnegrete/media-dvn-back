const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin, checkUserDB } = require("../middleware/checkRole");
const { typesAllowForTheme, loadAndGenerateURLs } = require("../middleware//typesAllowAndLoad");
const { getContent, createContent, deleteContent, getContentForID, getCountMediaFiles, getContentWithMedia } = require("../controller/content.controller");
const { uploadMedia } = require("../helpers/multer");

const router = Router();

router.get('/', getContent);//solo texto, quitar en la respuesta "media"
router.get('/with-media', checkUserDB, getContentWithMedia); //traer solo si esta registrado en el sistema
router.get('/mediaFiles', checkRoleAdmin, getCountMediaFiles);
router.get('/:_id', checkUserDB, getContentForID); //traer solo si esta registrado en el sistema
router.post('/',
    uploadMedia,
    checkRoleCreator,
    typesAllowForTheme,
    loadAndGenerateURLs,
    createContent);
router.delete('/', checkRoleAdmin, deleteContent);


module.exports = router;