// Données de démonstration pour Atlas Bank
// Lancer avec : npm run seed
const bcrypt = require("bcrypt");
const pool = require("./src/config/db");

async function seed() {
  const hashAdmin = await bcrypt.hash("admin123", 10);
  const hashDemo = await bcrypt.hash("demo123", 10);

  const [admin] = await pool.query(
    "INSERT INTO clients (nom, prenom, email, mot_de_passe, telephone, is_admin) VALUES (?, ?, ?, ?, ?, 1)",
    ["Atlas", "Admin", "admin@atlasbank.ma", hashAdmin, "0600000000"]
  );

  const [demo] = await pool.query(
    "INSERT INTO clients (nom, prenom, email, mot_de_passe, telephone) VALUES (?, ?, ?, ?, ?)",
    ["Benali", "Yassine", "demo@atlasbank.ma", hashDemo, "0611111111"]
  );

  const [compte1] = await pool.query(
    "INSERT INTO comptes (client_id, numero_compte, type, solde) VALUES (?, 'AB1001', 'courant', 5000)",
    [demo.insertId]
  );
  const [compte2] = await pool.query(
    "INSERT INTO comptes (client_id, numero_compte, type, solde) VALUES (?, 'AB1002', 'epargne', 12000)",
    [demo.insertId]
  );

  await pool.query(
    "INSERT INTO transactions (compte_id, type, montant, description, solde_apres) VALUES (?, 'depot', 5000, 'Dépôt initial', 5000)",
    [compte1.insertId]
  );
  await pool.query(
    "INSERT INTO transactions (compte_id, type, montant, description, solde_apres) VALUES (?, 'depot', 12000, 'Dépôt initial', 12000)",
    [compte2.insertId]
  );

  console.log("Seed terminé.");
  console.log("Admin : admin@atlasbank.ma / admin123");
  console.log("Démo  : demo@atlasbank.ma / demo123");
  await pool.end();
}

seed();
