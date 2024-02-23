const express = require("express");

const { contactSeller, enquiredProperties } = require("../controllers/enquiry");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/contact-seller", requireSignIn, contactSeller);
router.get("/enquired-properties", requireSignIn, enquiredProperties);

module.exports = router;
