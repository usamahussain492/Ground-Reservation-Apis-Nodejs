const User = require("../../../models/user");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const currentDate = new Date();
    const users = await User.find({
      role: "user",
      membershipExpiresAt: { $gte: currentDate },
    }).select("-password ");
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved all users with membership not equal to none.",
      result: users,
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to retrieve users.", error.message);
  }
};
