// src/components/GAIATransfer.jsx
import React, { useState } from "react";
import { ethers } from "ethers";
import GAIA_ABI from "./GAIA_ABI.json";

const GAIA_ADDRESS = "0x9469260538446129534FC0A0a36251C96Ebd2682"; // Dirección en Gnosis Mainnet

export default function GAIATransfer() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        setStatus("❌ MetaMask no está disponible");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(GAIA_ADDRESS, GAIA_ABI, signer);
      const decimals = await contract.decimals();
      const amountParsed = ethers.parseUnits(amount, decimals);

      const tx = await contract.transfer(to, amountParsed);
      await tx.wait();

      setStatus("✅ Transferencia exitosa");
    } catch (error) {
      console.error("🚨 Error al transferir GAIA:", error);
      setStatus("❌ Error en la transferencia");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Transferir GAIA</h2>
      <input
        type="text"
        placeholder="Dirección de destino"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ marginRight: "1rem", width: "300px" }}
      />
      <input
        type="text"
        placeholder="Cantidad GAIA"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: "1rem", width: "100px" }}
      />
      <button onClick={handleTransfer}>Transferir</button>
      <p>{status}</p>
    </div>
  );
}
