const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireSignIn = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // console.log(decoded);

      req.user = decoded;

      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { requireSignIn };
