const TeamRequest = require("../../models/TeamRequest");
const sendErrorResponse = require("../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { _id } = req.user;

    const teamRequests = await TeamRequest.find({ user: _id })
      .populate("user", "username email image")
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
