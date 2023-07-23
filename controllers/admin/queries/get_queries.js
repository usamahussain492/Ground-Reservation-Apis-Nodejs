const Queries = require("../../../models/Queries");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const queries = await Queries.aggregate([
      {
        $lookup: {
          from: "users", // Replace with the actual name of the "users" collection in your database
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            {
              $project: {
                username: 1,
                email: 1,
                image: 1,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          queries: { $push: "$$ROOT" },
        },
      },
    ]);

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved all queries.",
      result: queries,
    });
  } catch (error) {
    sendErrorResponse(res, 400, "Failed to retrieve queries.", error.message);
  }
};
