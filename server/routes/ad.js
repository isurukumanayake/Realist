const express = require("express");

const {
  create,
  ads,
  read,
  adsForSell,
  adsForRent,
  userAds,
  update,
  remove,
  incrementViews,
  saves,
  search,
} = require("../controllers/ad");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.post("/ad", requireSignIn, create);
router.get("/ads", ads);
router.get("/ad/:slug", read);

router.get("/ads-for-sell", adsForSell);
router.get("/ads-for-rent", adsForRent);

router.get("/user-ads", requireSignIn, userAds);
router.put("/ad/:id", requireSignIn, update);
router.delete("/ad/:id", requireSignIn, remove);

router.put("/ad/:id/increment-views", incrementViews);
router.get("/ad/:id/saves", saves);

router.get("/search", search);

module.exports = router;
