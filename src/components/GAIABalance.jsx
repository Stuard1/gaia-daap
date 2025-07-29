import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./GAIA_ABI.json";

const GAIA_CONTRACT = import.meta.env.VITE_GAIA_CONTRACT;

export default function GAIATransferHistory({ account }) {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    if (!account) return;

    const fetchTransfers = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(GAIA_CONTRACT, abi, provider);

        const filter = contract.filters.Transfer(account, null);
        const events = await contract.queryFilter(filter, -1000);

        const lastThree = events.slice(-3).reverse().map((event) => ({
          to: event.args.to,
          value: ethers.utils.formatUnits(event.args.value, 18),
          tx: event.transactionHash
        }));

        setTransfers(lastThree);
      } catch (error) {
        console.error("Error loading transfers:", error);
      }
    };

    fetchTransfers();
  }, [account]);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h4>📜 Últimas transferencias</h4>
      {transfers.length === 0 ? (
        <p>No hay transferencias recientes.</p>
      ) : (
        <ul>
          {transfers.map((t, i) => (
            <li key={i}>
              ➡️ A: <strong>{t.to.slice(0, 6)}...{t.to.slice(-4)}</strong><br />
              💰 Cantidad: {t.value} GAIA<br />
              🔗 <a href={`https://gnosisscan.io/tx/${t.tx}`} target="_blank" rel="noopener noreferrer">Ver transacción</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
