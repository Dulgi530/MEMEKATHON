# IDateU Backend (Mock KYC + DID + Items + MemeX)

Minimal Express + MongoDB backend implementing the requested endpoints with mock KYC and on-chain stubs.

## Quickstart

1. Copy `.env.example` to `.env` and adjust values.
2. Ensure MongoDB is running and accessible at `MONGODB_URI`.
3. Install deps and run (from `backend/`):

```
npm install
npm run dev
```

Server listens on `PORT` (default `4000`).

## Auth Model

- Use `POST /auth/social/callback` to create or fetch a user.
- Subsequent requests must include header `x-user-id: <userId>`.

## Endpoints

- `POST /auth/social/callback`
  - body: `{ provider, social_id }`
  - returns user and `{ header: 'x-user-id', value: <id> }`

- `POST /kyc/submit` (auth)
  - body: `{ birthdate: 'YYYY-MM-DD', gender: 'male|female|other', country: 'KR' }`
  - computes `is_adult`, `gender` enum, `country_code`, and `did_commit = keccak256(userId + randomSalt)`
  - updates `users` and calls on-chain stub

- `GET /me/did-status` (auth)
  - returns whether DID exists and basic flags

- `POST /items/purchase/fiat` (auth)
  - body: `{ item_id, duration_days? }`
  - creates a `user_items` record (assumes payment success)

- `GET /items/me` (auth)
  - returns non-expired user items

- `POST /webhook/item-purchased`
  - body: `{ buyer, itemId, price?, tx_hash? }`
  - maps `buyer` to `users.memex_wallet_address` and inserts item

- `POST /memex/link-wallet` (auth)
  - body: `{ address, message, signature }`
  - verifies signature locally with `ethers` and stores wallet

- `GET /memex/me/memex-profile` (auth)
  - returns mock profile `{ score, badges }`

## Data Models

Collection `users`:
- `social_provider`, `social_id` (unique pair)
- `did_commit` (bytes32 hex)
- `is_adult` (bool), `gender` (0 unknown, 1 male, 2 female, 3 other)
- `country_code` (string, e.g. KR)
- `is_memex_linked` (bool), `memex_wallet_address` (string, lowercased)
- timestamps

Collection `user_items`:
- `user_id` (ref users)
- `item_id` in `[LIKE_UNLIMITED, UNDO, SUPERLIKE, HIDE_ONCHAIN]`
- `expires_at` (nullable)
- createdAt

## On-chain (stub)

`src/services/onchain.js` contains a placeholder `registerOrUpdateDIDOnChain` which just logs. Replace with real ethers.js contract calls later.

## Notes

- This is a minimal MVP. No sessions, just a header-based user selection for simplicity.
- `did_commit` generation discards salt per your note (no PII in DB). For real systems, manage linkage off-DB or via user-held secrets.
- Input validation is basic; add stronger validation and rate limiting before production use.

