const express = require("express");
const router = express.Router();
const { verifierJeton } = require("../middlewares/auth");
const compteController = require("../controllers/compteController");
const transactionController = require("../controllers/transactionController");

router.use(verifierJeton);
router.get("/", compteController.lister);
router.post("/", compteController.creer);
router.get("/:id", compteController.detail);
router.get("/:id/transactions", transactionController.historique);

module.exports = router;
