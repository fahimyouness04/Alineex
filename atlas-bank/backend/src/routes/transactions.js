const express = require("express");
const router = express.Router();
const { verifierJeton } = require("../middlewares/auth");
const transactionController = require("../controllers/transactionController");

router.use(verifierJeton);
router.post("/depot", transactionController.depot);
router.post("/retrait", transactionController.retrait);
router.post("/virement", transactionController.virement);

module.exports = router;
