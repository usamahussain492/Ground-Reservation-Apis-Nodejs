const express = require("express");
const user_authorize = require("../middlewares/user_authorize");
const get_all_grounds = require("../controllers/user/ground/get_all_grounds");
const add_ground_reservation = require("../controllers/user/reservation/add_ground_reservation");
const get_booked_slots_ground = require("../controllers/user/reservation/get_booked_slots_ground");
const update_time_gr = require("../controllers/admin/ground_reservation/update_time_gr");
const delete_ground_reservation = require("../controllers/admin/ground_reservation/delete_ground_reservation");
const contact_us = require("../controllers/user/profile/contact_us");
const change_details = require("../controllers/user/profile/change_details");
const change_image = require("../controllers/user/profile/change_image");
const upload = require("../middlewares/multer");
const get_profile = require("../controllers/user/profile/get_profile");

const router = express.Router();

// ground
router.get("/grounds",user_authorize,get_all_grounds);
router.get("/ground/:groundId/reservations",user_authorize,get_booked_slots_ground);

// ground reservation
router.post("/reservation",user_authorize,add_ground_reservation);
router.put("/reservation/update/time/:reservationId",user_authorize,update_time_gr)
router.delete("/reservation/:reservationId",user_authorize,delete_ground_reservation)

// contact us
router.post("/contact-us",user_authorize, contact_us)

// profile 
router.put("/profile/change-details",user_authorize,change_details)
router.put("/profile/change-image",user_authorize,upload.single('image'),user_authorize,change_image)
router.get("/profile",user_authorize,get_profile)


module.exports = router;