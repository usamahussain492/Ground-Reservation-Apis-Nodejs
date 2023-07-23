const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { reservationId } = req.params;

    // Check if the reservation exists
    const reservation = await GroundReservation.findById(reservationId);
    if (!reservation) {
      return sendErrorResponse(res, 404, "Reservation not found.");
    }

    // Delete the reservation
    await GroundReservation.deleteOne({ _id: reservationId });

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully deleted the reservation.",
      result: reservation,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to delete the reservation.",
      error.message
    );
  }
};
