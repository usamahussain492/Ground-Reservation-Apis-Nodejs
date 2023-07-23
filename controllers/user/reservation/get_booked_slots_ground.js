const Ground = require("../../../models/Ground");
const GroundReservation = require("../../../models/GroundReservation");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    const { groundId } = req.params;

    // Check if the ground exists
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return sendErrorResponse(res, 404, "Ground not found.");
    }

    // Get all reservations for the ground
    const reservations = await GroundReservation.find({ ground: groundId });

    // Create an object to store slots grouped by date
    const slotsByDate = {};

    // Group reservations by date
    reservations.forEach((reservation) => {
      const date = reservation.from.toISOString().split("T")[0];
      if (!slotsByDate[date]) {
        slotsByDate[date] = [];
      }
      slotsByDate[date].push({
        from: reservation.from,
        to: reservation.to,
        booked: true,
      });
    });

    // Sort slots within each date
    for (const date in slotsByDate) {
      slotsByDate[date].sort((a, b) => a.from - b.from);
    }

    // Find the gaps between slots within each date
    for (const date in slotsByDate) {
      const slots = slotsByDate[date];
      const slotsCount = slots.length;
      for (let i = 0; i < slotsCount - 1; i++) {
        const currentSlot = slots[i];
        const nextSlot = slots[i + 1];

        const currentSlotTo = currentSlot.to.getTime();
        const nextSlotFrom = nextSlot.from.getTime();

        // Check if there is a gap between slots
        if (currentSlotTo < nextSlotFrom) {
          const availableSlot = {
            from: currentSlot.to,
            to: nextSlot.from,
            booked: false,
          };
          slots.push(availableSlot);
        }
      }
    }

    return res.status(200).json({
      code: 200,
      status: true,
      message: "Successfully retrieved slots grouped by date.",
      result: slotsByDate,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to get slots for the ground.",
      error.message
    );
  }
};
