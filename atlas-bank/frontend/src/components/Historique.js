import React, { useState, useEffect } from "react";
import { api } from "../api";

// Historique des transactions d'un compte
function Historique({ compteId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.transactions(compteId).then(setTransactions);
  }, [compteId]);

  if (transactions.length === 0) {
    return <p>Aucune transaction.</p>;
  }

  return (
    <div>
      <h3>Historique</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} — {Number(t.montant).toFixed(2)} MAD — solde après :{" "}
            {Number(t.solde_apres).toFixed(2)} MAD —{" "}
            {new Date(t.date_transaction).toLocaleDateString("fr-FR")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Historique;
