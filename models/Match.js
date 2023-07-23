const mongoose = require("mongoose");
const MatchSchema = new mongoose.Schema({
    tournament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tournament",
      required: true,
    },
    team1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamRequest",
      required: true,
    },
    team2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeamRequest",
      required: true,
    },
    ground: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ground",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  });

  const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
  