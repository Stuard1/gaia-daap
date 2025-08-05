import { ethers } from "ethers";
import GAIA_ABI from "./GAIA_ABI.json"; // Asegúrate de que este path esté correcto

// Dirección del contrato GAIA en Gnosis Chain Mainnet
const GAIA_CONTRACT_ADDRESS = "0x9469260538446129534FC0A0a36251C96Ebd2682";

export function getGAIAContract(provider) {
  return new ethers.Contract(GAIA_CONTRACT_ADDRESS, GAIA_ABI, provider);
}
