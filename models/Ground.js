const mongoose = require("mongoose");

const GroundSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image:{
        type: String,
        default: null
    },
    name:{
        type: String,
        default: null
    },
    location:{
        type: String,
        default: null
    },
    price:{
        type: Number,
        default: 0

    },
    description:{
        type: String,
        default: null
    }

  },
  {
    timestamps: true,
    collection: "Ground",
  }
);

const Ground = mongoose.model("Ground", GroundSchema);

module.exports = Ground;
