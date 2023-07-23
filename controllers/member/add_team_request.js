const TeamRequest = require("../../models/TeamRequest");
const sendErrorResponse = require("../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
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
    console.log(req.body)
    // Check for missing required fields
    if (!name || !email || !teamName || !totalParticipants || !from || !to) {
      return sendErrorResponse(res, 400, "Missing required fields.");
    }

    // Create the team request
    const teamRequest = await TeamRequest.create({
      name,
      email,
      phoneNo,
      teamName,
      user: req.user._id,
      totalParticipants,
      isSportKit,
      additionalInfo,
      from: new Date(from),
      to: new Date(to),
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully created team request.",
      result: teamRequest,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the team request.",
      error.message
    );
  }
};
