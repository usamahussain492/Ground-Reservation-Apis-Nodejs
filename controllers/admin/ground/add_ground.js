const Ground = require("../../../models/Ground");
const addImage = require("../../../utils/addImage");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {
    const { name,location,price,description } = req.body;
    let image;
    if(req.file){
        image = await addImage(req.file);
    }
    const ground = await Ground.create({
        user: req.user._id,
        image: image,
        name: name,
        location: location,
        description: description,
        price: price
    })
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully created ground.",
      result: ground,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the ground.",
      error.message
    );
  }
};
