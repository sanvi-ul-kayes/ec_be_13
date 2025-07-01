const { default: mongoose } = require("mongoose");

let authSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    OTP: {
      type: String,
    },
    isVarify: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    adderss: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("auth", authSchema);
