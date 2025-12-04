// Placeholder for on-chain calls. For now we just log payloads.

export async function registerOrUpdateDIDOnChain({ userCommit, isAdult, gender, countryCommit }) {
  // TODO: wire ethers + contract ABI when ready
  console.log('[onchain] registerOrUpdateDID', { userCommit, isAdult, gender, countryCommit });
  return { txHash: '0xmocktx' };
}

