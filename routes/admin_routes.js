const express = require("express");
const add_ground = require("../controllers/admin/ground/add_ground");
const admin_authorize = require("../middlewares/admin_authorize");
const upload = require("../middlewares/multer");
const update_ground = require("../controllers/admin/ground/update_ground");
const get_ground = require("../controllers/admin/ground/get_ground");
const delete_ground = require("../controllers/admin/ground/delete_ground");
const get_all_ground = require("../controllers/admin/ground/get_all_ground");
const update_status_ground_reservation = require("../controllers/admin/ground_reservation/update_status_ground_reservation");
const get_all_gr = require("../controllers/admin/ground_reservation/get_all_gr");
const update_time_gr = require("../controllers/admin/ground_reservation/update_time_gr");
const delete_ground_reservation = require("../controllers/admin/ground_reservation/delete_ground_reservation");
const get_all_tournaments = require("../controllers/admin/tournament/get_all_tournaments");
const create_tournaments = require("../controllers/admin/tournament/create_tournaments");
const get_all_team_request = require("../controllers/admin/team_request/get_all_team_request");
const update_status = require("../controllers/admin/team_request/update_status");
const change_details = require("../controllers/user/profile/change_details");
const change_image = require("../controllers/user/profile/change_image");
const get_users = require("../controllers/admin/users/get_users");
const get_members = require("../controllers/admin/users/get_members");
const get_admin_profile = require("../controllers/admin/profile/get_admin_profile");
const get_queries = require("../controllers/admin/queries/get_queries");
const change_query_status = require("../controllers/admin/queries/change_query_status");
const get_active_members = require("../controllers/admin/users/get_active_members");
const router = express.Router();

// ground
router.post("/ground",admin_authorize,upload.single("image"),admin_authorize, add_ground);
router.patch("/ground/:id",admin_authorize,upload.single("image"),admin_authorize, update_ground);
router.get("/ground/:id",admin_authorize, get_ground);
router.get("/ground",admin_authorize, get_all_ground);
router.delete("/ground/:id",admin_authorize, delete_ground);


// ground reservations
router.put("/reservation/:reservationId",admin_authorize, update_status_ground_reservation)
router.get("/reservation/:groundId",admin_authorize,get_all_gr)
router.put("/reservation/update/time/:reservationId",admin_authorize,update_time_gr)
router.delete("/reservation/:reservationId",admin_authorize,delete_ground_reservation)


// tournaments
router.get("/tournament",admin_authorize,get_all_tournaments)
router.post("/tournament",admin_authorize,create_tournaments)

// team requests
router.get("/team/request",admin_authorize,get_all_team_request);
router.put("/team/request/:teamRequestId",admin_authorize,update_status);

// profile 
router.put("/profile/change-details",admin_authorize,change_details)
router.put("/profile/change-image",admin_authorize,upload.single('image'),admin_authorize,change_image)
router.get("/profile",admin_authorize,get_admin_profile)
router.get("/users",admin_authorize,get_users);
router.get("/members",admin_authorize,get_members)
router.get("/members/active",admin_authorize,get_active_members)


//queries
router.get("/queries",admin_authorize,get_queries);
router.put("/queries/:id",admin_authorize,change_query_status)


module.exports = router;