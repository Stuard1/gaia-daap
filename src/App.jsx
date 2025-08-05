import React, { useState, useEffect } from "react";
import GAIABalance from "./components/GAIABalance";
import GAIATransfer from "./components/GAIATransfer";

function App() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
        } catch (err) {
          console.error("Usuario rechazó conexión:", err);
        }
      }
    };
    connect();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🌱 Aplicación descentralizada GAIA</h1>
      {account ? (
        <>
          <GAIABalance account={account} />
          <GAIATransfer />
        </>
      ) : (
        <p>🔌 Conectando con MetaMask...</p>
      )}
    </div>
  );
}

export default App;
