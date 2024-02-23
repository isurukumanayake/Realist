const { nanoid } = require("nanoid");
const Ad = require("../models/ad");
const User = require("../models/user");
const slugify = require("slugify");
const GOOGLE_GEOCODER = require("../config/geocoder");

const create = async (req, res) => {
  try {
    const {
      type,
      category,
      address,
      landSize,
      landSizeUnit,
      title,
      description,
      price,
      photos,
    } = req.body;

    if (!type) {
      return res.json({ error: "Type is required" });
    }

    if (!category) {
      return res.json({ error: "Cateogry is required" });
    }

    if (!address) {
      return res.json({ error: "Address is required" });
    }

    if (!title) {
      return res.json({ error: "Title is required" });
    }

    if (!description) {
      return res.json({ error: "Description is required" });
    }

    if (!price) {
      return res.json({ error: "Price is required" });
    }

    if (!photos?.length) {
      return res.json({ error: "Photos are required" });
    }

    const geo = await GOOGLE_GEOCODER.geocode(address);

    const ad = new Ad({
      ...req.body,
      postedBy: req.user._id,
      slug: slugify(`${type}-${category}-${address}-${price}-${nanoid(6)}`),
      location: {
        type: "Point",
        coordinates: [geo[0]?.longitude, geo[0]?.latitude],
      },
      googleMap: geo,
    });

    ad.save();

    //make user role -> Seller
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { role: "Seller" },
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;

    return res.json({
      ad,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const ads = async (req, res) => {
  try {
    const adsForSell = await Ad.find({ type: "sell" })
      .select("-googleMap -location -photos.Key -photos.key -photos.ETag")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ type: "rent" })
      .select("-googleMap -location -photos.Key -photos.key -photos.ETag")
      .sort({ createdAt: -1 })
      .limit(12);

    return res.json({ adsForRent, adsForSell });
  } catch (error) {
    console.log(error);
  }
};

const read = async (req, res) => {
  try {
    const ad = await Ad.findOne({ slug: req.params.slug }).populate(
      "postedBy",
      "name username email phone company photo.Location"
    );

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    //related
    const related = await Ad.find({
      _id: { $ne: ad._id },
      type: ad.type,
      category: ad.category,
      address: {
        $regex: ad.googleMap[0]?.administrativeLevels.level1short,
        $options: "i",
      },
    })
      .limit(3)
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket -googleMap");

    return res.json({ ad, related });
  } catch (error) {
    console.log(error);
  }
};

const adsForSell = async (req, res) => {
  try {
    const perPage = req.query.limit || 12;
    const page = req.query.page || 1;

    const total = await Ad.find({ type: "sell" }).countDocuments();

    const ads = await Ad.find({ type: "sell" })
      .select("-googleMap -location -photos.Key -photos.key -photos.ETag")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(total / perPage);

    return res.json({ ads, total, totalPages });
  } catch (error) {
    console.log(error);
  }
};

const adsForRent = async (req, res) => {
  try {
    const perPage = req.query.limit || 12;
    const page = req.query.page || 1;

    const total = await Ad.find({ type: "rent" }).countDocuments();

    const ads = await Ad.find({ type: "rent" })
      .select("-googleMap -location -photos.Key -photos.key -photos.ETag")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalPages = Math.ceil(total / perPage);

    return res.json({ ads, total, totalPages });
  } catch (error) {
    console.log(error);
  }
};

const userAds = async (req, res) => {
  try {
    const perPage = req.query.limit || 3;
    const page = req.query.page || 1;

    const total = await Ad.find({ postedBy: req.user._id }).countDocuments();

    const ads = await Ad.find({ postedBy: req.user._id })
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

const update = async (req, res) => {
  try {
    const {
      type,
      category,
      address,
      landSize,
      landSizeUnit,
      title,
      description,
      price,
      photos,
    } = req.body;

    const ad = await Ad.findById(req.params.id);

    const owner = req.user._id == ad?.postedBy;

    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      if (!type) {
        return res.json({ error: "Type is required" });
      }

      if (!category) {
        return res.json({ error: "Cateogry is required" });
      }

      if (!address) {
        return res.json({ error: "Address is required" });
      }

      if (!title) {
        return res.json({ error: "Title is required" });
      }

      if (!description) {
        return res.json({ error: "Description is required" });
      }

      if (!price) {
        return res.json({ error: "Price is required" });
      }

      if (!photos?.length) {
        return res.json({ error: "Photos are required" });
      }

      const geo = await GOOGLE_GEOCODER.geocode(address);

      await Ad.findByIdAndUpdate(
        { _id: req.params.id },
        {
          ...req.body,
          slug: slugify(`${type}-${category}-${address}-${price}-${nanoid(6)}`),
          location: {
            type: "Point",
            coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
          },
          googleMap: geo,
        }
      );

      return res.json({ ok: true });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const remove = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    const owner = req.user._id == ad?.postedBy;

    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      await Ad.findByIdAndDelete(req.params.id);

      // Check if the user has any remaining ads
      const remainingAds = await Ad.find({
        postedBy: req.user._id,
      }).countDocuments();

      let user;

      // If no remaining ads, remove user role "Seller"
      if (remainingAds === 0) {
        user = await User.findByIdAndUpdate(
          req.user._id,
          { $pull: { role: "Seller" } },
          { new: true }
        );
      } else {
        user = await User.findById(req.user._id);
      }

      user.password = undefined;
      user.resetCode = undefined;

      return res.json({ ok: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Something went wrong. Try again" });
  }
};

const incrementViews = async (req, res) => {
  try {
    await Ad.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

const saves = async (req, res) => {
  try {
    const user = await User.find({});

    let saves = 0;

    user.map((u) => {
      if (u.wishlist.includes(req.params.id)) {
        saves++;
      }
    });

    return res.json({ saves });
  } catch (error) {
    console.log(error);
  }
};

const search = async (req, res) => {
  try {
    // console.log(req.query);

    const {
      address,
      type,
      category,
      priceRange,
      minBedrooms,
      minBathrooms,
      listingStatus,
      minParkings,
      propertySizeRange,
      lotSizeRange,
    } = req.query;

    let query = {
      type: type === "buy" ? "sell" : "rent",
      categoryValue: category,
      price: { $gte: parseInt(priceRange[0]), $lte: parseInt(priceRange[1]) },
      $and: [
        {
          $or: [
            { categoryValue: 100 },
            {
              $and: [
                { categoryValue: { $ne: 100 } },
                {
                  propertySize: {
                    $gte: parseInt(propertySizeRange[0]),
                    $lte: parseInt(propertySizeRange[1]),
                  },
                },
              ],
            },
          ],
        },
        {
          $or: [
            {
              categoryValue: { $nin: [100, 101] },
            },
            {
              $and: [
                { categoryValue: { $in: [100, 101] } },
                {
                  $or: [
                    {
                      landSizeUnit: "acres",
                      landSize: {
                        $gte: parseInt(lotSizeRange[0] / 160), // Convert perches to acres
                        $lte: parseInt(lotSizeRange[1] / 160), // Convert perches to acres
                      },
                    },
                    {
                      landSizeUnit: "perches",
                      landSize: {
                        $gte: parseInt(lotSizeRange[0]), // No conversion needed for perches
                        $lte: parseInt(lotSizeRange[1]), // No conversion needed for perches
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    if (address) {
      const geo = await GOOGLE_GEOCODER.geocode(address);
      // console.log(geo);
      query.location = {
        $near: {
          $maxDistance: 500000, // 1000m = 1km
          $geometry: {
            type: "Point",
            coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
          },
        },
      };
      // query.googleMap = {
      //   $elemMatch: {
      //     administrativeLevels: {
      //       level1long: geo?.[0]?.administrativeLevels?.level1long,
      //     },
      //   },
      // };
    }

    if (minBedrooms !== "any") {
      query.bedrooms = { $gt: parseInt(minBedrooms) };
    }

    if (minBathrooms !== "any") {
      query.bathrooms = { $gt: parseInt(minBathrooms) };
    }

    if (!Array.isArray(listingStatus)) {
      query.sold = listingStatus === "Sold";
    }

    if (minParkings !== "any") {
      query.parkings = { $gt: parseInt(minParkings) };
    }

    const perPage = req.query.limit || 16;
    const pageNo = req.query.pageNo || 1;

    const ads = await Ad.find(query)
      .sort({ createdAt: -1 })
      .select(
        "-googleMap -location -photos.Key -photos.key -photos.ETag -photos.Bucket"
      )
      .skip((pageNo - 1) * perPage)
      .limit(perPage);

    const totalAds = await Ad.find(query);

    const totalPages = Math.ceil(totalAds.length / perPage);

    // console.log(ads);

    return res.json({ ads, total: totalAds.length, totalPages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
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
};
