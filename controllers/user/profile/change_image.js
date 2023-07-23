const User = require("../../../models/user");
const addImage = require("../../../utils/addImage");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { image } = req.file;

    // Check if the user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    // Upload the user's image
    const imagePath = await addImage(req.file);

    // Update the user's image path
    user.image = imagePath;
    await user.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully uploaded user image.",
      result: user,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to upload user image.",
      error.message
    );
  }
};
