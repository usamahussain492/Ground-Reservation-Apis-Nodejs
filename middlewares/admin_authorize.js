const JWT = require("jsonwebtoken");
const User = require("../models/user");
const sendErrorResponse = require("../utils/send-error-response");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined") {
    return res.status(401).send("user not authorized");
  }

  const token = bearerHeader.split(" ")[1];

  console.log(token)

  try {
    await JWT.verify(
      token,
      process.env.TOKEN_KEY,
      async (err, decodedToken) => {
        if (err) {
          return res.status(400).json({
            code: 400,
            success: false,
            message: "Failed to verify token.",
            result: { err },
          });
        } else {
          let user = await User.findById(decodedToken.id);
          if (user.role == "admin") {
            req.user = user;
            next();
          }else{
            throw new Error("Your role is not allowed to access this.");
          }
        }
      }
    ).catch((err) => {
      throw new Error(err.message);
    });
  } catch (err) {
    sendErrorResponse(res, 400, "Failed to verify Token.", err.message);
  }
};
