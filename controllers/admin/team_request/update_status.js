const TeamRequest = require("../../../models/TeamRequest");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { teamRequestId } = req.params;
    const { status } = req.body;

    // Check if the team request exists
    const teamRequest = await TeamRequest.findById(teamRequestId);
    if (!teamRequest) {
      return sendErrorResponse(res, 404, "Team request not found.");
    }

    // Update the status of the team request
    teamRequest.status = status;
    await teamRequest.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated the status of the team request.",
      result: teamRequest,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the status of the team request.",
      error.message
    );
  }
};
