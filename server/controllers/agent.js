const User = require("../models/user");
const Ad = require("../models/ad");

const agents = async (req, res) => {
  try {
    const perPage = req.query.limit || 3;
    const page = req.query.page || 1;

    const total = await User.find({ role: "Seller" }).countDocuments();

    const agents = await User.find({ role: "Seller" })
      .select(
        "-password -resetCode -role -enquiredProperties -wishlist -photo.key -photo.Key -photo.Bucket"
      )
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(total / perPage);

    return res.json({ agents, total, totalPages });
  } catch (error) {
    console.log(error);
  }
};

const agentAdCount = async (req, res) => {
  try {
    const count = await Ad.find({ postedBy: req.params.id }).countDocuments();
    return res.json(count);
  } catch (error) {
    console.log(error);
  }
};

const agent = async (req, res) => {
  try {
    const agent = await User.findOne({ username: req.params.username }).select(
      "-password -resetCode -role -enquiredProperties -wishlist -photo.key -photo.Key -photo.Bucket"
    );

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const totalAds = await Ad.find({ postedBy: agent._id }).countDocuments();

    return res.json({ agent, totalAds });
  } catch (error) {
    console.log(error);
  }
};

const incrementViews = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

const agentAds = async (req, res) => {
  try {
    const perPage = req.query.limit || 8;
    const page = req.query.page || 1;

    const total = await Ad.find({ postedBy: req.params.id }).countDocuments();

    const ads = await Ad.find({ postedBy: req.params.id })
      .select(
        "-photos.Key -photos.key -photos.ETag -photos.Bucket -location -googleMap"
      )
      .populate("postedBy", "name email username phone company")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(total / perPage);

    return res.json({ ads, total, totalPages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  agents,
  agentAdCount,
  agent,
  incrementViews,
  agentAds,
};
