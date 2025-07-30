import React, { useState } from "react";
import { ethers } from "ethers";
import GAIA_ABI from "./GAIA_ABI.json";

const GAIATransfer = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTransfer = async () => {
    try {
      if (!window.ethereum) {
        setStatus("❌ MetaMask no está instalado.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const GAIA_ADDRESS = "0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae";
      const contract = new ethers.Contract(GAIA_ADDRESS, GAIA_ABI, signer);

      // ✅ Obtener los decimales del contrato antes de hacer parseUnits
      const decimals = await contract.decimals();
      const amountParsed = ethers.parseUnits(amount, decimals);

      const tx = await contract.transfer(to, amountParsed);
      await tx.wait();

      setStatus("✅ Transferencia exitosa");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + (err.message || "Ocurrió un error"));
    }
  };

  return (
    <div>
      <h2>Transferir GAIA</h2>
      <input
        type="text"
        placeholder="Dirección de destino"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cantidad GAIA"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transferir</button>
      <p>{status}</p>
    </div>
  );
};

export default GAIATransfer;


