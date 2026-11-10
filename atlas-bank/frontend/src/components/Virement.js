import React, { useState } from "react";
import { api } from "../api";

// Formulaire de virement vers un autre compte
function Virement({ compteSource, onFait }) {
  const [numero, setNumero] = useState("");
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  async function envoyer(e) {
    e.preventDefault();
    setMessage("");
    try {
      await api.virement({
        compte_source_id: compteSource.id,
        numero_compte_destinataire: numero,
        montant: Number(montant),
        description
      });
      setNumero("");
      setMontant("");
      setDescription("");
      setMessage("Virement effectué.");
      onFait();
    } catch (err) {
      setMessage("Virement impossible : solde insuffisant ou compte introuvable.");
    }
  }

  return (
    <div>
      <h3>Virement</h3>
      <form onSubmit={envoyer}>
        <input placeholder="Numéro du compte destinataire" value={numero} onChange={(e) => setNumero(e.target.value)} />
        <input type="number" placeholder="Montant" value={montant} onChange={(e) => setMontant(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Envoyer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Virement;
