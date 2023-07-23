const { default: mongoose } = require("mongoose");
const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { groundId } = req.params;

    // Check if the ground exists
    const groundReservations = await GroundReservation.aggregate([
      { $match: { ground: new mongoose.Types.ObjectId(groundId) }},
      {
        $group: {
          _id: "$status",
          reservations: { $push: "$$ROOT" },

        },
        
      },
      {
        $lookup: {
          from: "users", // Assuming the user collection name is "users"
          localField: "reservations.user",
          foreignField: "_id",
          as: "populatedUser",
        },
      },
      // {
      //   $lookup: {
      //     from: "Ground", // Assuming the ground collection name is "grounds"
      //     localField: "reservations.ground",
      //     foreignField: "_id",
      //     as: "populatedGround",
      //   },
      // },
      {
        $addFields: {
          "reservations.user": { $arrayElemAt: ["$populatedUser", 0] },
          // "reservations.ground": { $arrayElemAt: ["$populatedGround", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          status: "$_id",
          "reservations.user.username": 1,
          "reservations.user.email": 1,
          "reservations.user.image": 1, 
          "reservations.ground": 1,
          "reservations.status": 1,
          "reservations.from": 1,
          "reservations.to": 1,
          "reservations._id": 1,
          "reservations.totalParticipants": 1,
          "reservations.totalPrice": 1,

        },
      },
    ]);
 
    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved ground reservations grouped by status.",
      result: groundReservations,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get ground reservations grouped by status.",
      error.message
    );
  }
};
