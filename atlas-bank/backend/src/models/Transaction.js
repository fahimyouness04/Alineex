const pool = require("../config/db");

async function creer(transaction) {
  const [resultat] = await pool.query(
    "INSERT INTO transactions (compte_id, type, montant, description, compte_destinataire_id, solde_apres) VALUES (?, ?, ?, ?, ?, ?)",
    [
      transaction.compte_id,
      transaction.type,
      transaction.montant,
      transaction.description || null,
      transaction.compte_destinataire_id || null,
      transaction.solde_apres
    ]
  );
  return resultat.insertId;
}

async function trouverParCompte(compteId) {
  const [lignes] = await pool.query(
    "SELECT * FROM transactions WHERE compte_id = ? ORDER BY date_transaction DESC",
    [compteId]
  );
  return lignes;
}

module.exports = { creer, trouverParCompte };
