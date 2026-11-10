const pool = require("../config/db");

async function trouverParEmail(email) {
  const [lignes] = await pool.query("SELECT * FROM clients WHERE email = ?", [email]);
  return lignes[0];
}

async function trouverParId(id) {
  const [lignes] = await pool.query(
    "SELECT id, nom, prenom, email, telephone, is_admin, date_creation FROM clients WHERE id = ?",
    [id]
  );
  return lignes[0];
}

async function creer(client) {
  const [resultat] = await pool.query(
    "INSERT INTO clients (nom, prenom, email, mot_de_passe, telephone) VALUES (?, ?, ?, ?, ?)",
    [client.nom, client.prenom, client.email, client.mot_de_passe, client.telephone]
  );
  return trouverParId(resultat.insertId);
}

async function listerTous() {
  const [lignes] = await pool.query(
    "SELECT id, nom, prenom, email, telephone, is_admin, date_creation FROM clients ORDER BY nom"
  );
  return lignes;
}

module.exports = { trouverParEmail, trouverParId, creer, listerTous };
