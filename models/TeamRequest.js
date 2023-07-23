const mongoose = require("mongoose");

const TeamRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
    },
    teamName: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalParticipants: {
      type: Number,
      default: 0,
    },
    isSportKit: {
      type: Boolean,
      default: false,
    },
    additionalInfo: {
      type: String,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "TeamRequest",
  }
);

const TeamRequest = mongoose.model("TeamRequest", TeamRequestSchema);

module.exports = TeamRequest;
