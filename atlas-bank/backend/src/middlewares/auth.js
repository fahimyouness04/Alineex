const jwt = require("jsonwebtoken");

// Vérifie le jeton JWT envoyé dans le header Authorization
function verifierJeton(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ code: "NON_AUTHENTIFIE" });
  }
  const jeton = header.split(" ")[1];
  try {
    const donnees = jwt.verify(jeton, process.env.JWT_SECRET);
    req.utilisateur = donnees;
    next();
  } catch (e) {
    return res.status(401).json({ code: "NON_AUTHENTIFIE" });
  }
}

// Vérifie que l'utilisateur connecté est un administrateur
function verifierAdmin(req, res, next) {
  if (!req.utilisateur || !req.utilisateur.is_admin) {
    return res.status(403).json({ code: "ACCES_REFUSE" });
  }
  next();
}

module.exports = { verifierJeton, verifierAdmin };
