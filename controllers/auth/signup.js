const User = require("../../models/user");
const createToken = require("../../utils/create-token");
const sendErrorResponse = require("../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { username, email, password, phoneNo,membership } = req.body;
    const user = await User.findOne({
      $or: [{ email: email }],
    });
    if (user) {
      throw new Error("This email is already exists. Please try a unique one.");
    }

    let membershipExpiresAt = null;
    if (membership === "bronze") {
      membershipExpiresAt = new Date();
      membershipExpiresAt.setMonth(membershipExpiresAt.getMonth() + 1);
    } else if (membership === "silver") {
      membershipExpiresAt = new Date();
      membershipExpiresAt.setMonth(membershipExpiresAt.getMonth() + 3);
    } else if (membership === "gold") {
      membershipExpiresAt = new Date();
      membershipExpiresAt.setMonth(membershipExpiresAt.getMonth() + 6);
    }

    

    const newUser = await User.create({
      username,
      email,
      password,
      role:"user",
      phoneNo,
      membership,
      membershipExpiresAt,
    });
    const token = await createToken(newUser._id);

    return res.status(201).json({
      code: 201,
      status: true,
      message: "User created successfully",
      result: {
        user: await User.findOne({ _id: newUser._id }).select(
          "-password"
        ),
        token: token,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to create your account.",
      error.message
    );
  }
};
