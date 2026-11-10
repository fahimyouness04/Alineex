import React, { useState } from "react";
import { api } from "../api";

// Écran de connexion / inscription
function Login({ onConnecte }) {
  const [estInscription, setEstInscription] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [erreur, setErreur] = useState("");

  async function envoyer(e) {
    e.preventDefault();
    setErreur("");
    try {
      let resultat;
      if (estInscription) {
        resultat = await api.inscription({ nom, prenom, email, mot_de_passe: motDePasse, telephone });
      } else {
        resultat = await api.connexion({ email, mot_de_passe: motDePasse });
      }
      localStorage.setItem("jeton", resultat.jeton);
      onConnecte(resultat.utilisateur);
    } catch (err) {
      setErreur("Identifiants incorrects ou email déjà utilisé.");
    }
  }

  return (
    <div className="carte">
      <h2>{estInscription ? "Créer un compte" : "Se connecter"}</h2>
      <form onSubmit={envoyer}>
        {estInscription && (
          <>
            <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
            <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            <input placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          </>
        )}
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Mot de passe" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
        <button type="submit">{estInscription ? "S'inscrire" : "Se connecter"}</button>
      </form>
      {erreur && <p className="erreur">{erreur}</p>}
      <p>
        <button className="lien" onClick={() => setEstInscription(!estInscription)}>
          {estInscription ? "J'ai déjà un compte" : "Créer un compte"}
        </button>
      </p>
      <p className="astuce">Démo : demo@atlasbank.ma / demo123</p>
    </div>
  );
}

export default Login;
