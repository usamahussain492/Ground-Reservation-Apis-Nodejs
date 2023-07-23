const Ground = require("../../../models/Ground");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {

    const ground = await Ground.find({user:req.user._id}).populate({
      path: "user",
      select: "-password"
    })

  
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully get all grounds.",
      result: ground,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get all the grounds.",
      error.message
    );
  }
};
