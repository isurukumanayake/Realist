const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
require("colors");

const utilRoutes = require("./routes/util");
const authRoutes = require("./routes/auth");
const adRoutes = require("./routes/ad");
const agentRoutes = require("./routes/agent");
const wishlistRoutes = require("./routes/wishlist");
const enquiryRoutes = require("./routes/enquiry");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/", utilRoutes);
app.use("/api/", authRoutes);
app.use("/api/", adRoutes);
app.use("/api/", agentRoutes);
app.use("/api/", wishlistRoutes);
app.use("/api/", enquiryRoutes);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

app.listen(4005, () => {
  console.log("Server started on port 4005");
});
