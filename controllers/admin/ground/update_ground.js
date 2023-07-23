const Ground = require("../../../models/Ground");
const addImage = require("../../../utils/addImage");
const sendErrorResponse = require("../../../utils/send-error-response");

require("dotenv/config");

module.exports = async (req, res) => {
  try {
    const { name,location,price,description } = req.body;
    let image = null;
    if(req.file){
        image = await addImage(req.file);
    }
   const old_ground = await Ground.findById(req.params.id);
    const ground = await Ground.findByIdAndUpdate(req.params.id,{
        image: image || old_ground.image,
        name: name || old_ground.name,
        location: location || old_ground.location,
        description: description || old_ground.description,
        price: price || old_ground.price
    })
    
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated ground.",
      result: await Ground.findOne({_id:req.params.id}).populate({
        path: "user"
      }),
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the ground.",
      error.message
    );
  }
};
