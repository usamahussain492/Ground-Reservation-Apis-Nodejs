const Queries = require("../../../models/Queries");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const query = await Queries.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!query) {
        return sendErrorResponse(res, 404, "Query not found.");
      }
  
      return res.status(200).json({
        code: 200,
        status: true,
        message: "Query status updated successfully.",
        result: query,
      });
    } catch (error) {
      sendErrorResponse(res, 400, "Failed to update query status.", error.message);
    }
  };
  