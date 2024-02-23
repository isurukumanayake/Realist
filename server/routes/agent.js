const express = require("express");
const {
  agents,
  agentAdCount,
  agent,
  incrementViews,
  agentAds,
} = require("../controllers/agent");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.get("/agents", agents);
router.get("/agent-ad-count/:id", agentAdCount);
router.get("/agent/:username", agent);

router.put("/agent/:id/increment-views", incrementViews);

router.get("/agent-ads/:id", agentAds);

module.exports = router;
