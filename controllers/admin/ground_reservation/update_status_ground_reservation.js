const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    // Check if the reservation exists
    const reservation = await GroundReservation.findById(reservationId);
    if (!reservation) {
      return sendErrorResponse(res, 404, "Reservation not found.");
    }

    // Update the status of the reservation
    reservation.status = status;
    await reservation.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully updated the reservation status.",
      result: reservation,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to update the reservation status.",
      error.message
    );
  }
};
