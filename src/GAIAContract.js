import { ethers } from "ethers";

// Dirección del contrato GAIA desplegado en Chiado
const GAIA_ADDRESS = "0x5FeaeBfB4439F3516c74939A9D04e95AFE82C4ae";

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
