const express = require("express");

const { uploadImage, removeImage } = require("../controllers/util");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/upload-image", uploadImage);
router.post("/delete-image", removeImage);

module.exports = router;
