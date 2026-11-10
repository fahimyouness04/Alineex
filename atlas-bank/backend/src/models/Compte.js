const pool = require("../config/db");

async function trouverParClient(clientId) {
  const [lignes] = await pool.query(
    "SELECT * FROM comptes WHERE client_id = ? ORDER BY date_creation",
    [clientId]
  );
  return lignes;
}

async function trouverParId(id) {
  const [lignes] = await pool.query("SELECT * FROM comptes WHERE id = ?", [id]);
  return lignes[0];
}

async function trouverParNumero(numero) {
  const [lignes] = await pool.query("SELECT * FROM comptes WHERE numero_compte = ?", [numero]);
  return lignes[0];
}

async function creer(clientId, type) {
  const numero = "AB" + Date.now().toString().slice(-6);
  const [resultat] = await pool.query(
    "INSERT INTO comptes (client_id, numero_compte, type, solde) VALUES (?, ?, ?, 0)",
    [clientId, numero, type]
  );
  return trouverParId(resultat.insertId);
}

async function mettreAJourSolde(id, nouveauSolde) {
  await pool.query("UPDATE comptes SET solde = ? WHERE id = ?", [nouveauSolde, id]);
}

async function listerTous() {
  const [lignes] = await pool.query(
    "SELECT c.*, cl.nom, cl.prenom FROM comptes c JOIN clients cl ON cl.id = c.client_id ORDER BY c.date_creation"
  );
  return lignes;
}

module.exports = {
  trouverParClient,
  trouverParId,
  trouverParNumero,
  creer,
  mettreAJourSolde,
  listerTous
};
