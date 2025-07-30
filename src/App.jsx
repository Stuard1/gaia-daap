import { useEffect, useState } from "react";
import { ethers } from "ethers";
import GAIA_ABI from "./components/GAIA_ABI.json";
import GAIATransfer from "./components/GAIATransfer";
import GAIABalance from "./components/GAIABalance";

const GAIA_CONTRACT = "0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae";

function App() {
  const [account, setAccount] = useState(null);

  // 👉 Conexión automática a MetaMask
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
          <GAIABalance account={account} abi={GAIA_ABI} contractAddress={GAIA_CONTRACT} />
          <GAIATransfer />
        </>
      ) : (
        <p>🔌 Conectando con MetaMask...</p>
      )}
    </div>
  );
}

export default App;
