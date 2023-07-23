const Ground = require("../../../models/Ground");
const addImage = require("../../../utils/addImage");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {
    
    const ground = await Ground.findByIdAndDelete(req.params.id)
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully deleted ground.",
      result: ground,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to delete the ground.",
      error.message
    );
  }
};
