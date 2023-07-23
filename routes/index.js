const express = require("express");
const router = express.Router();
const admin_authorize = require("../middlewares/admin_authorize");
const auth = require("./auth_routes");
const admin = require("./admin_routes");
const user = require("./user_routes");
const member = require("./member_routes");

router.use("/auth",auth);
router.use("/admin",admin)
router.use("/user",user)
router.use("/member",member)
 


module.exports = router;