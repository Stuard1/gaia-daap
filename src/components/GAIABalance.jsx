import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getGAIAContract } from "../GAIAContract";

export default function GAIABalance({ account }) {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!account || !window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = getGAIAContract(provider);

        const balanceRaw = await contract.balanceOf(account);
        const decimals = await contract.decimals();
        const formatted = ethers.formatUnits(balanceRaw, decimals);

        setBalance(formatted);
      } catch (err) {
        console.error(err);
        setError("Error GAIA");
      }
    };

    fetchBalance();
  }, [account]);

  const addTokenToMetaMask = async () => {
    try {
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae",
            symbol: "GAIA",
            decimals: 18,
            image: "https://i.imgur.com/XW1BqCy.png",
          },
        },
      });

      if (wasAdded) {
        console.log("✅ GAIA fue agregado a MetaMask");
      } else {
        console.log("⛔ El usuario canceló la acción");
      }
    } catch (error) {
      console.error("❌ Error al agregar GAIA a MetaMask:", error);
    }
  };

  return (
    <div>
      <h3>💰 Tu saldo GAIA:</h3>
      {error ? <p>{error}</p> : <p>{balance} GAIA</p>}
      <button onClick={addTokenToMetaMask}>➕ Agregar GAIA a MetaMask</button>
    </div>
  );
}
