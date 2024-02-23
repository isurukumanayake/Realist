const Ad = require("../models/ad");
const User = require("../models/user");

const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { wishlist: req.body.adId },
      },
      { new: true }
    );

    const { password, resetCode, ...rest } = user._doc;

    return res.json(rest);
  } catch (error) {
    console.log(error);
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.adId },
      },
      { new: true }
    );

    const { password, resetCode, ...rest } = user._doc;

    return res.json(rest);
  } catch (error) {
    console.log(error);
  }
};

const wishlist = async (req, res) => {
  try {
    const perPage = req.query.limit || 3;
    const page = req.query.page || 1;

    const user = await User.findById(req.user._id);

    const total = await Ad.find({
      _id: user.wishlist,
    }).countDocuments();

    const ads = await Ad.find({ _id: user.wishlist })
      .select(
        "-photos.Key -photos.key -photos.ETag -photos.Bucket -location -googleMap"
      )
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(total / perPage);

    return res.json({ ads, total, totalPages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  wishlist,
};
