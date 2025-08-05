import { ethers } from "ethers";

// Dirección del contrato GAIA desplegado en Chiado
 const GAIA_CONTRACT_ADDRESS = "0x9469260538446129534FC0A0a36251C96Ebd2682";
// ABI del contrato GAIA (resumido, con las funciones más importantes)
const GAIA_ABI = [
  // Nombre del token
  "function name() view returns (string)",
  // Símbolo del token
  "function symbol() view returns (string)",
  // Decimales
  "function decimals() view returns (uint8)",
  // Suministro total
  "function totalSupply() view returns (uint256)",
  // Balance de una cuenta
  "function balanceOf(address) view returns (uint)",
  // Transferencia de tokens
  "function transfer(address to, uint amount) returns (bool)",
];

export function getGAIAContract(providerOrSigner) {
  return new ethers.Contract(GAIA_ADDRESS, GAIA_ABI, providerOrSigner);
}
