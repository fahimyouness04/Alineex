const Compte = require("../models/Compte");

async function lister(req, res) {
  const comptes = await Compte.trouverParClient(req.utilisateur.id);
  res.json(comptes);
}

async function creer(req, res) {
  const { type } = req.body;
  if (type !== "courant" && type !== "epargne") {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const compte = await Compte.creer(req.utilisateur.id, type);
  res.status(201).json(compte);
}

async function detail(req, res) {
  const compte = await Compte.trouverParId(req.params.id);
  if (!compte || compte.client_id !== req.utilisateur.id) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  res.json(compte);
}

module.exports = { lister, creer, detail };
