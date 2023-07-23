const Queries = require("../../../models/Queries");
const User = require("../../../models/user");
const sendEmail = require("../../../utils/send-email");
const sendErrorResponse = require("../../../utils/send-error-response");
require("dotenv/config");

module.exports = async (req, res) => {
  try {
    const { email, name, description } = req.body;

    // Find all admin users
    const adminUsers = await User.find({ role: "admin" });

    // Send the contact-us message to each admin user
    await adminUsers.forEach(async (adminUser) => {
      await sendEmail({
        email: adminUser.email,
        from: process.env.SMPT_MAIL,
        subject: "Contact Us Message",
        message: `Hi ${adminUser.username},\n\nYou have received a new contact-us message:\n\nName: ${name}\nEmail: ${email}\nDescription: ${description}\n\nPlease respond to the user accordingly.\n\nBest regards,\nYour App`,
      });
    });

    await Queries.create({
      user: req.user._id,
      name: name,
      email: email,
      description: description
    })

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Your message has been sent to the admin.",
      result: {
          email: email,
          name: name,
          description: description,
        },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to send the contact-us message.",
      error.message
    );
  }
};
