const { default: mongoose } = require("mongoose");

let productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: Array,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
    },
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rating",
    },
    sellingPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("product", productSchema);
