import express from 'express';
import auth from '../middleware/auth.js';
import { recoverAddress, verifyMessage } from 'ethers';
import { normalizeAddress } from '../utils/crypto.js';

const router = express.Router();

// POST /memex/link-wallet
// body: { address, message, signature }
router.post('/link-wallet', auth, async (req, res) => {
  try {
    const { address, message, signature } = req.body || {};
    if (!address || !message || !signature) return res.status(400).json({ error: 'address, message, signature required' });

    const signer = await verifyMessage(message, signature);
    if (normalizeAddress(signer) !== normalizeAddress(address)) {
      return res.status(400).json({ error: 'Signature does not match address' });
    }

    req.user.memex_wallet_address = normalizeAddress(address);
    req.user.is_memex_linked = true;
    await req.user.save();

    res.json({ ok: true, address: req.user.memex_wallet_address });
  } catch (err) {
    console.error('Link wallet error', err);
    res.status(500).json({ error: 'Failed to link wallet' });
  }
});

// GET /me/memex-profile
router.get('/me/memex-profile', auth, async (req, res) => {
  if (!req.user.memex_wallet_address) return res.status(400).json({ error: 'Wallet not linked' });
  // Mock MemeX profile
  res.json({
    address: req.user.memex_wallet_address,
    score: 1234,
    badges: {
      staking: true,
      campaign: false,
      early_user: true,
    },
  });
});

export default router;

