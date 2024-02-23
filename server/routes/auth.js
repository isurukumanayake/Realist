const express = require("express");
const {
  welcome,
  preRegister,
  register,
  login,
  forgotPassword,
  accessAccount,
  refreshToken,
  currentUser,
  publicProfile,
  updatePassword,
  updateProfile,
} = require("../controllers/auth");

const { requireSignIn } = require("../middlewares/auth");

const router = express.Router();

router.get("/", welcome);
router.post("/pre-register", preRegister);
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/access-account", accessAccount);
router.get("/refresh-token", refreshToken);
router.get("/current-user", requireSignIn, currentUser);
router.get("/profile/:username", publicProfile);
router.put("/update-password", requireSignIn, updatePassword);
router.put("/update-profile", requireSignIn, updateProfile);

module.exports = router;
