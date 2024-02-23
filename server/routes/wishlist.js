const express = require("express");

const {
  addToWishlist,
  removeFromWishlist,
  wishlist,
} = require("../controllers/wishlist");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/wishlist", requireSignIn, addToWishlist);
router.delete("/wishlist/:adId", requireSignIn, removeFromWishlist);
router.get("/wishlist", requireSignIn, wishlist);

module.exports = router;
