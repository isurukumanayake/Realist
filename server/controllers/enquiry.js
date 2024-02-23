const { AWSSES } = require("../config/aws");
const Ad = require("../models/ad");
const User = require("../models/user");
const emailTemplate = require("../helpers/email");

const contactSeller = async (req, res) => {
  try {
    const { name, email, message, phone, adId } = req.body;

    const ad = await Ad.findById(adId).populate("postedBy", "email");

    const user = await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        enquiredProperties: adId,
      },
    });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    if (!ad) {
      return res.json({ error: "Ad not found" });
    }

    AWSSES.sendEmail(
      emailTemplate(
        ad.postedBy.email,
        `
        <p>You have received a new customer enquiry.</p>

        <h4>Customer details</h4>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
         
        <a href="${process.env.CLIENT_URL}/ad/${ad.slug}">
        ${ad.category} in ${ad.address} for ${
          ad.type == "sell" ? "sale" : "rent"
        } </a>
        `,
        email,
        "New enquiry"
      ),
      (err, data) => {
        if (err) {
          console.log(err);
          return res.json({ ok: false });
        } else {
          console.log(data);
          return res.json({ ok: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const enquiredProperties = async (req, res) => {
  try {
    const perPage = req.query.limit || 3;
    const page = req.query.page || 1;

    const user = await User.findById(req.user._id);

    const total = await Ad.find({
      _id: user.enquiredProperties,
    }).countDocuments();

    const ads = await Ad.find({ _id: user.enquiredProperties })
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
  contactSeller,
  enquiredProperties,
};
