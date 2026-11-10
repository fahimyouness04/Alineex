import React, { useState, useEffect } from "react";
import { api } from "../api";
import Historique from "./Historique";
import Virement from "./Virement";

// Tableau de bord : solde total, comptes, dépôt / retrait
function Dashboard({ utilisateur }) {
  const [comptes, setComptes] = useState([]);
  const [compteActif, setCompteActif] = useState(null);
  const [type, setType] = useState("courant");
  const [montant, setMontant] = useState("");
  const [message, setMessage] = useState("");

  function charger() {
    api.comptes().then((data) => {
      setComptes(data);
      if (data.length > 0 && !compteActif) {
        setCompteActif(data[0]);
      }
    });
  }

  useEffect(charger, []);

  const soldeTotal = comptes.reduce((s, c) => s + Number(c.solde), 0);

  async function creerCompte(e) {
    e.preventDefault();
    await api.creerCompte({ type });
    charger();
  }

  async function operation(action) {
    if (!compteActif || !montant || Number(montant) <= 0) {
      return;
    }
    setMessage("");
    try {
      if (action === "depot") {
        await api.depot({ compte_id: compteActif.id, montant: Number(montant) });
      } else {
        await api.retrait({ compte_id: compteActif.id, montant: Number(montant) });
      }
      setMontant("");
      charger();
    } catch (err) {
      setMessage("Solde insuffisant ou erreur.");
    }
  }

  return (
    <div>
      <h2>Bonjour, {utilisateur.prenom} {utilisateur.nom}</h2>
      <p className="solde-total">Solde total : {soldeTotal.toFixed(2)} MAD</p>

      <div className="carte">
        <h3>Mes comptes</h3>
        {comptes.map((c) => (
          <button
            key={c.id}
            className={compteActif && compteActif.id === c.id ? "compte actif" : "compte"}
            onClick={() => setCompteActif(c)}
          >
            {c.numero_compte} — {c.type} : {Number(c.solde).toFixed(2)} MAD
          </button>
        ))}
        <form onSubmit={creerCompte}>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="courant">Compte courant</option>
            <option value="epargne">Compte épargne</option>
          </select>
          <button type="submit">Créer un compte</button>
        </form>
      </div>

      {compteActif && (
        <div className="carte">
          <h3>
            {compteActif.numero_compte} — {Number(compteActif.solde).toFixed(2)} MAD
          </h3>
          <input
            type="number"
            placeholder="Montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
          <button onClick={() => operation("depot")}>Déposer</button>
          <button onClick={() => operation("retrait")}>Retirer</button>
          {message && <p className="erreur">{message}</p>}
          <Virement compteSource={compteActif} onFait={charger} />
          <Historique compteId={compteActif.id} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
