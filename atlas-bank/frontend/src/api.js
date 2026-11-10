const BASE = "http://localhost:3001/api";

function headers(avecJeton) {
  const h = { "Content-Type": "application/json" };
  if (avecJeton) {
    h["Authorization"] = "Bearer " + localStorage.getItem("jeton");
  }
  return h;
}

async function appel(route, methode, donnees, avecJeton) {
  const reponse = await fetch(BASE + route, {
    method: methode,
    headers: headers(avecJeton),
    body: donnees ? JSON.stringify(donnees) : undefined
  });
  const resultat = await reponse.json();
  if (!reponse.ok) {
    throw new Error(resultat.code || "ERREUR");
  }
  return resultat;
}

export const api = {
  inscription: (d) => appel("/auth/inscription", "POST", d, false),
  connexion: (d) => appel("/auth/connexion", "POST", d, false),
  comptes: () => appel("/comptes", "GET", null, true),
  creerCompte: (d) => appel("/comptes", "POST", d, true),
  transactions: (id) => appel("/comptes/" + id + "/transactions", "GET", null, true),
  depot: (d) => appel("/transactions/depot", "POST", d, true),
  retrait: (d) => appel("/transactions/retrait", "POST", d, true),
  virement: (d) => appel("/transactions/virement", "POST", d, true)
};
