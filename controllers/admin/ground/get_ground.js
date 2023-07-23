const Ground = require("../../../models/Ground");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {
    console.log(req.params.id)
    const ground = await Ground.findById(req.params.id).populate({
      path: "user",
      select: "-password"
    })

    if(!ground){
      return res.status(200).json({
        code: 200,
        status: true,
        message: "You don't have ground with id " + req.params.id,
      });
    }
  
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully get ground.",
      result: ground,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get the ground.",
      error.message
    );
  }
};
