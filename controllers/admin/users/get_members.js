const User = require("../../../models/user");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports  = async (req, res) => {
  try {
    const users = await User.find({ role: "user", membership: { $ne: "none" } }).select("-password");
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved all members.",
      result: users,
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to retrieve users.", error.message);
  }
};
