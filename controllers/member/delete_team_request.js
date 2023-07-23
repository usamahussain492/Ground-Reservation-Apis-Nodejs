const TeamRequest = require("../../models/TeamRequest");
const sendErrorResponse = require("../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { teamRequestId } = req.params;

    // Check if the team request exists
    const teamRequest = await TeamRequest.findByIdAndRemove(teamRequestId);
    if (!teamRequest) {
      return sendErrorResponse(res, 404, "Team request not found.");
    }



    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully deleted the team request.",
      result: teamRequest,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to delete the team request.",
      error.message
    );
  }
};
