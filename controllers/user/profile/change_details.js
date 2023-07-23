const User = require("../../../models/user");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { username, phoneNo,password } = req.body;

    // Check if the user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    // Update the user details
    user.username = username || user.username;
    user.phoneNo = phoneNo || user.phoneNo;
    user.password = password || user.password;
    await user.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated user details.",
      result: user,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update user details.",
      error.message
    );
  }
};
