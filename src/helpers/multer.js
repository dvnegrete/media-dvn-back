const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})
const uploadMedia = upload.array('media');

module.exports = { uploadMedia };