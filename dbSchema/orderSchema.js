const { default: mongoose } = require("mongoose");

let orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    cartItems: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    totalPrice: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Order", orderSchema);
