import { ethers } from "ethers";
 import GAIA_ABI from "./components/GAIA_ABI.json";
const GAIA_CONTRACT_ADDRESS = "0x9469260538446129534FC0A0a36251C96Ebd2682"; // Gnosis Mainnet

export function getGAIAContract(provider) {
  return new ethers.Contract(GAIA_CONTRACT_ADDRESS, GAIA_ABI, provider);
}
