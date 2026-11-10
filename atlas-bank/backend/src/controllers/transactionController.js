const Compte = require("../models/Compte");
const Transaction = require("../models/Transaction");

async function verifierCompte(req, compteId) {
  const compte = await Compte.trouverParId(compteId);
  if (!compte || compte.client_id !== req.utilisateur.id) {
    return null;
  }
  return compte;
}

async function depot(req, res) {
  const { compte_id, montant } = req.body;
  if (!compte_id || !montant || montant <= 0) {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const compte = await verifierCompte(req, compte_id);
  if (!compte) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  const nouveauSolde = Number(compte.solde) + Number(montant);
  await Compte.mettreAJourSolde(compte.id, nouveauSolde);
  await Transaction.creer({
    compte_id: compte.id,
    type: "depot",
    montant,
    description: "Dépôt",
    solde_apres: nouveauSolde
  });
  res.status(201).json({ solde: nouveauSolde });
}

async function retrait(req, res) {
  const { compte_id, montant } = req.body;
  if (!compte_id || !montant || montant <= 0) {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const compte = await verifierCompte(req, compte_id);
  if (!compte) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  if (Number(compte.solde) < Number(montant)) {
    return res.status(409).json({ code: "SOLDE_INSUFFISANT" });
  }
  const nouveauSolde = Number(compte.solde) - Number(montant);
  await Compte.mettreAJourSolde(compte.id, nouveauSolde);
  await Transaction.creer({
    compte_id: compte.id,
    type: "retrait",
    montant,
    description: "Retrait",
    solde_apres: nouveauSolde
  });
  res.status(201).json({ solde: nouveauSolde });
}

async function virement(req, res) {
  const { compte_source_id, numero_compte_destinataire, montant, description } = req.body;
  if (!compte_source_id || !numero_compte_destinataire || !montant || montant <= 0) {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const source = await verifierCompte(req, compte_source_id);
  if (!source) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  const destinataire = await Compte.trouverParNumero(numero_compte_destinataire);
  if (!destinataire) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  if (Number(source.solde) < Number(montant)) {
    return res.status(409).json({ code: "SOLDE_INSUFFISANT" });
  }
  const soldeSource = Number(source.solde) - Number(montant);
  const soldeDest = Number(destinataire.solde) + Number(montant);
  await Compte.mettreAJourSolde(source.id, soldeSource);
  await Compte.mettreAJourSolde(destinataire.id, soldeDest);
  await Transaction.creer({
    compte_id: source.id,
    type: "virement_envoye",
    montant,
    description: description || "Virement",
    compte_destinataire_id: destinataire.id,
    solde_apres: soldeSource
  });
  await Transaction.creer({
    compte_id: destinataire.id,
    type: "virement_recu",
    montant,
    description: description || "Virement",
    compte_destinataire_id: source.id,
    solde_apres: soldeDest
  });
  res.status(201).json({ solde: soldeSource });
}

async function historique(req, res) {
  const compte = await verifierCompte(req, req.params.id);
  if (!compte) {
    return res.status(404).json({ code: "COMPTE_INTROUVABLE" });
  }
  const transactions = await Transaction.trouverParCompte(compte.id);
  res.json(transactions);
}

module.exports = { depot, retrait, virement, historique };
