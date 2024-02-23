const mongoose = require("mongoose");

const adSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["sell", "rent"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryValue: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      maxLength: 255,
      required: true,
    },
    bedrooms: Number,
    bathrooms: Number,
    parkings: Number,
    landSize: Number,
    landSizeUnit: {
      type: String,
      enum: ["perches", "acres"],
    },
    propertySize: Number,
    subCategory: String,
    title: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      maxLength: 5000,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: [{}],
    uploading: Boolean,
    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [79.8612, 6.9271],
      },
    },
    postedBy: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    sold: {
      type: Boolean,
      default: false,
    },
    googleMap: {},
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

adSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("ad", adSchema);
