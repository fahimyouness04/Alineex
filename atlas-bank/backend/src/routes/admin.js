const express = require("express");
const router = express.Router();
const { verifierJeton, verifierAdmin } = require("../middlewares/auth");
const Client = require("../models/Client");
const Compte = require("../models/Compte");

router.use(verifierJeton, verifierAdmin);

router.get("/clients", async (req, res) => {
  const clients = await Client.listerTous();
  res.json(clients);
});

router.get("/comptes", async (req, res) => {
  const comptes = await Compte.listerTous();
  res.json(comptes);
});

module.exports = router;
