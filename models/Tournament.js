const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    ground: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ground",
      required: true,
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TeamRequest",
        required: true,
      },
    ],
    matches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "Tournament",
  }
);

const Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;
