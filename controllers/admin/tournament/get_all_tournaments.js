const Tournament = require("../../../models/Tournament");
const TeamRequest = require("../../../models/TeamRequest");
const Ground = require("../../../models/Ground");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate("ground", "name location") // Populate the ground field with selected fields (name, location)
      .populate({
        path: "teams",
        model: TeamRequest,
        populate: {
          path: "user",
          model: "User",
          select: "name email", // Select the fields you want to populate from the user model
        },
      })
      .populate({
        path: "matches",
        model: "Match",
        populate: [
          { path: "team1", model: TeamRequest },
          { path: "team2", model: TeamRequest },
          { path: "ground", model: Ground, select: "name" }, // Select the field you want to populate from the ground model
        ],
      });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Tournaments retrieved successfully.",
      result: tournaments,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to retrieve the tournaments.",
      error.message
    );
  }
};
