import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function GAIABalance({ account, abi, contractAddress }) {
  const [balance, setBalance] = useState("...");

  useEffect(() => {
    const getBalance = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const decimals = await contract.decimals();
        const rawBalance = await contract.balanceOf(account);
        setBalance(ethers.formatUnits(rawBalance, decimals));
      } catch (err) {
        console.error("Error al obtener balance:", err);
        setBalance("Error");
      }
    };
    getBalance();
  }, [account]);

  return (
    <div>
      <h4>💰 Tu saldo GAIA:</h4>
      <p>{balance} GAIA</p>
    </div>
  );
}
