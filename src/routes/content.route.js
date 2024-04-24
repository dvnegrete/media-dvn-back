const { Router } = require("express");
const { checkRoleCreator, checkRoleAdmin } = require("../middleware/checkRole");
const { typesAllowForTheme, loadAndGenerateURLs } = require("../middleware//typesAllowAndLoad");
const { getContent, createContent, deleteContent } = require("../controller/content.controller");
const { uploadMedia } = require("../helpers/multer");
const { listBlobs } = require("../helpers/AzureBlob");

const router = Router();

router.get('/', getContent);
router.post('/',
    uploadMedia,
    checkRoleCreator,
    typesAllowForTheme,
    loadAndGenerateURLs,
    createContent);
router.delete('/', checkRoleAdmin, deleteContent);

router.get('/azure', async (req, res = response) => {
    try {
        const blobs = await listBlobs();
        if (!blobs) {
            res.status(404).json({
                msg: 'Not Found'
            });
        }
        res.json(blobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Error Server" })
    }
});

module.exports = router;