const User = require("../../../models/user");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved user profile.",
      result: user,
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to retrieve user profile.", error.message);
  }
};
