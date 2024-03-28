// Import express and router
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const appointmentRouter = require("./appointments");
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Import callback functions
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
const {
    getAllMassageShops,
    getSomeMassageShop,
    createNewMassageShop,
    updateMassageShop,
    deleteMassageShop,
} = require("../controllers/massageShop");
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Re-route into other resource routers
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
router.use("/:id/appointments", appointmentRouter);
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// APIs
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
// /api/v1/massage/
router
    .route("/")
    .get(getAllMassageShops)
    .post(protect, authorize("admin"), createNewMassageShop);

// /api/v1/MassageShops/:id
router
    .route("/:id")
    .get(getSomeMassageShop)
    .put(protect, authorize("admin"), updateMassageShop)
    .delete(protect, authorize("admin"), deleteMassageShop);
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */



// Export router
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
module.exports = router;
/* -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* */
