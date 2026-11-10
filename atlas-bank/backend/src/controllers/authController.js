const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");

function creerJeton(client) {
  return jwt.sign(
    { id: client.id, email: client.email, is_admin: !!client.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

function publicClient(client) {
  return {
    id: client.id,
    nom: client.nom,
    prenom: client.prenom,
    email: client.email,
    telephone: client.telephone,
    is_admin: !!client.is_admin
  };
}

async function inscription(req, res) {
  const { nom, prenom, email, mot_de_passe, telephone } = req.body;
  if (!nom || !prenom || !email || !mot_de_passe) {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const existant = await Client.trouverParEmail(email);
  if (existant) {
    return res.status(409).json({ code: "EMAIL_DEJA_UTILISE" });
  }
  const hash = await bcrypt.hash(mot_de_passe, 10);
  const client = await Client.creer({ nom, prenom, email, mot_de_passe: hash, telephone });
  const jeton = creerJeton(client);
  res.status(201).json({ jeton, utilisateur: publicClient(client) });
}

async function connexion(req, res) {
  const { email, mot_de_passe } = req.body;
  if (!email || !mot_de_passe) {
    return res.status(400).json({ code: "DONNEES_INVALIDES" });
  }
  const client = await Client.trouverParEmail(email);
  if (!client) {
    return res.status(401).json({ code: "NON_AUTHENTIFIE" });
  }
  const ok = await bcrypt.compare(mot_de_passe, client.mot_de_passe);
  if (!ok) {
    return res.status(401).json({ code: "NON_AUTHENTIFIE" });
  }
  const jeton = creerJeton(client);
  res.json({ jeton, utilisateur: publicClient(client) });
}

module.exports = { inscription, connexion };
