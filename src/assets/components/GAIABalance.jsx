import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getGAIAContract } from "../GAIAContract";

const GAIABalance = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(selectedAccount);
      } catch (err) {
        console.error("Usuario rechazó la conexión:", err);
      }
    } else {
      alert("MetaMask no está instalado.");
    }
  };

  const loadBalance = async () => {
    if (!account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = getGAIAContract(provider);
    const rawBalance = await contract.balanceOf(account);
    const decimals = await contract.decimals();
    const formatted = ethers.formatUnits(rawBalance, decimals);
    setBalance(formatted);
  };

  useEffect(() => {
    if (account) loadBalance();
  }, [account]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Balance de GAIA</h2>
      {account ? (
        <div>
          <p><strong>Dirección:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance ?? "Cargando..."} GAIA</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Conectar Wallet</button>
      )}
    </div>
  );
};

export default GAIABalance;
