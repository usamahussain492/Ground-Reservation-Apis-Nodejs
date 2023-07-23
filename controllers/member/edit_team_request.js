const TeamRequest = require("../../models/TeamRequest");
const sendErrorResponse = require("../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { teamRequestId } = req.params;
    const {
      name,
      email,
      phoneNo,
      teamName,
      totalParticipants,
      isSportKit,
      additionalInfo,
      from,
      to,
    } = req.body;

    // Check if the team request exists
    const teamRequest = await TeamRequest.findById(teamRequestId);
    if (!teamRequest) {
      return sendErrorResponse(res, 404, "Team request not found.");
    }

    // Update the team request with missing fields from the existing team request
    teamRequest.name = name || teamRequest.name;
    teamRequest.email = email || teamRequest.email;
    teamRequest.phoneNo = phoneNo || teamRequest.phoneNo;
    teamRequest.teamName = teamName || teamRequest.teamName;
    teamRequest.totalParticipants = totalParticipants || teamRequest.totalParticipants;
    teamRequest.isSportKit = isSportKit || teamRequest.isSportKit;
    teamRequest.additionalInfo = additionalInfo || teamRequest.additionalInfo;
    teamRequest.from = from ? new Date(from) : teamRequest.from;
    teamRequest.to = to ? new Date(to) : teamRequest.to;
    await teamRequest.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated the team request.",
      result: teamRequest,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the team request.",
      error.message
    );
  }
};
    