import { keccak256, toUtf8Bytes, concat, randomBytes, hexlify } from 'ethers';

// Create DID commit: keccak256(user_id + random_salt)
export function createDidCommit(userId) {
  const salt = randomBytes(32);
  const userBytes = toUtf8Bytes(String(userId));
  const data = concat([userBytes, salt]);
  const hash = keccak256(data);
  // We intentionally do not return/store the salt per spec.
  return hash; // 0x... bytes32 hex
}

export function normalizeAddress(addr) {
  return addr ? String(addr).toLowerCase() : null;
}

export function nowPlusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

