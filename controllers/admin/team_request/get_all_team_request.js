const TeamRequest = require("../../../models/TeamRequest");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const teamRequests = await TeamRequest.find()
      .populate("user", "name email")
      .exec();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved team requests.",
      result: teamRequests,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to retrieve team requests.",
      error.message
    );
  }
};
