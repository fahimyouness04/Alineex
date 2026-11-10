import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const sauvegarde = localStorage.getItem("utilisateur");
    if (sauvegarde) {
      setUtilisateur(JSON.parse(sauvegarde));
    }
  }, []);

  function connecter(u) {
    localStorage.setItem("utilisateur", JSON.stringify(u));
    setUtilisateur(u);
  }

  function deconnecter() {
    localStorage.removeItem("jeton");
    localStorage.removeItem("utilisateur");
    setUtilisateur(null);
  }

  return (
    <div className="app">
      <header>
        <h1>Atlas Bank</h1>
        {utilisateur && <button onClick={deconnecter}>Se déconnecter</button>}
      </header>
      <main>
        {utilisateur ? (
          <Dashboard utilisateur={utilisateur} />
        ) : (
          <Login onConnecte={connecter} />
        )}
      </main>
    </div>
  );
}

export default App;
