const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: 256,
    },
    address: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "",
    },
    photo: {},
    role: {
      type: [String],
      default: ["Buyer"],
      enum: ["Buyer", "Seller", "Admin"],
    },
    enquiredProperties: [
      {
        type: mongoose.ObjectId,
        ref: "Ad",
      },
    ],
    wishlist: [
      {
        type: mongoose.ObjectId,
        ref: "Ad",
      },
    ],
    resetCode: {
      type: String,
      default: "",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
