const Ground = require("../../../models/Ground");
const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { groundId, from, to, totalParticipants } = req.body;

    // Validate the from and to dates
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const currentDate = new Date();

    // Remove the timezone offset
    const fromDateString = fromDate.toISOString().split("T")[0];
    const toDateString = toDate.toISOString().split("T")[0];

    // Check if the dates are on the same day
    if (fromDateString !== toDateString) {
      return sendErrorResponse(
        res,
        400,
        "From and to dates should be on the same day."
      );
    }

    // Check if the maximum 4-hour difference is exceeded
    const timeDifferenceInHours = (toDate - fromDate) / (1000 * 60 * 60);
    if (timeDifferenceInHours > 4) {
      return sendErrorResponse(
        res,
        400,
        "The maximum allowed duration is 4 hours."
      );
    }

    // Check if the ground exists
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return sendErrorResponse(res, 404, "Ground not found.");
    }

    // Calculate the duration in hours
    const durationInMs = new Date(to) - new Date(from);
    const durationInHours = durationInMs / (1000 * 60 * 60);

    // Calculate the total price based on the ground price and duration
    const totalPrice = ground.price * durationInHours;

    // Check for overlapping reservations
    const overlappingReservations = await GroundReservation.find({
      ground: groundId,
      $or: [
        { from: { $lt: new Date(to) }, to: { $gt: new Date(from) } },
        { from: { $lt: new Date(from) }, to: { $gt: new Date(to) } },
      ],
    });

    if (overlappingReservations.length > 0) {
      return sendErrorResponse(
        res,
        400,
        "This ground is already booked for the specified time."
      );
    }

    // Create the ground reservation with the calculated total price
    const reservation = await GroundReservation.create({
      user: req.user._id,
      ground: groundId,
      from: new Date(from),
      to: new Date(to),
      totalParticipants: totalParticipants,
      totalPrice: totalPrice,
    });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully created ground reservation.",
      result: reservation,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the ground reservation.",
      error.message
    );
  }
};
