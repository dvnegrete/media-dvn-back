const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin, checkUserDB } = require("../middleware/checkRole");
const { typesAllowForTheme, loadAndGenerateURLs } = require("../middleware/typesAllowAndLoad");
const { getContent, createContent, deleteContent, getContentForID, getCountMediaFiles, getContentWithMedia } = require("../controller/content.controller");
const { uploadMedia } = require("../helpers/multer");

const router = Router();

router.get('/', getContent);
router.get('/mediaFiles', checkRoleAdmin, getCountMediaFiles);
router.get('/:_id', getContentForID);
router.post('/',
    uploadMedia,
    checkRoleCreator,
    typesAllowForTheme,
    loadAndGenerateURLs,
    createContent);
router.delete('/:_id', checkRoleAdmin, deleteContent);

module.exports = router;