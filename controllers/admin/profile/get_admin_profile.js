const Ground = require("../../../models/Ground");
const GroundReservation = require("../../../models/GroundReservation");
const Queries = require("../../../models/Queries");
const TeamRequest = require("../../../models/TeamRequest");
const Tournament = require("../../../models/Tournament");
const User = require("../../../models/user");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { _id } = req.user;

    const admin = await User.findById(_id);

    if (!admin) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    const groundCount = await Ground.countDocuments();
    const groundReservationCount = await GroundReservation.countDocuments();
    const pendinggroundReservationCount =
      await GroundReservation.countDocuments({ status: "pending" });
    const approvedgroundReservationCount =
      await GroundReservation.countDocuments({ status: "approved" });
    const rejectedgroundReservationCount =
      await GroundReservation.countDocuments({ status: "rejected" });

    const teamRequestCount = await TeamRequest.countDocuments();
    const pendingteamRequestCount = await TeamRequest.countDocuments({
      status: "pending",
    });
    const approvedteamRequestCount = await TeamRequest.countDocuments({
      status: "approved",
    });
    const rejectedteamRequestCount = await TeamRequest.countDocuments({
      status: "rejected",
    });

    const tournamentCount = await Tournament.countDocuments();
    const userCount = await User.countDocuments({ role: "user" });
    const memberCount = await User.countDocuments({
      role: "user",
      membershipExpiresAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });
    const pendingQueries = await Queries.countDocuments({ status: "pending" });
    const resolvedQueries = await Queries.countDocuments({
      status: "resolved",
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved admin profile.",
      result: {
        admin: admin,
        stats: {
          ground: groundCount,
          groundReservation: {
            total: groundReservationCount,
            pending: pendinggroundReservationCount,
            approved: approvedgroundReservationCount,
            rejected: rejectedgroundReservationCount,
          },
          teamRequest: {
            total: teamRequestCount,
            pending: pendingteamRequestCount,
            approved: approvedteamRequestCount,
            rejected: rejectedteamRequestCount,
          },
          tournament: tournamentCount,
          user: userCount,
          member: memberCount,
          queries: {
            total: pendingQueries + resolvedQueries,
            pending: pendingQueries,
            resolved: resolvedQueries,
          },
        },
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to retrieve admin profile.",
      error.message
    );
  }
};
