import express from 'express';
import User from '../models/User.js';
import UserItem, { ITEM_IDS } from '../models/UserItem.js';
import { normalizeAddress } from '../utils/crypto.js';

const router = express.Router();

// POST /webhook/item-purchased
// body example: { buyer: '0x...', itemId: 'SUPERLIKE', price: '1000000000000000000', tx_hash: '0x...' }
router.post('/item-purchased', async (req, res) => {
  try {
    const { buyer, itemId } = req.body || {};
    if (!buyer || !itemId) return res.status(400).json({ error: 'buyer and itemId required' });
    if (!ITEM_IDS.includes(itemId)) return res.status(400).json({ error: 'invalid itemId' });

    const user = await User.findOne({ memex_wallet_address: normalizeAddress(buyer) });
    if (!user) return res.status(404).json({ error: 'User with given wallet not found' });

    const record = await UserItem.create({ user_id: user._id, item_id: itemId, expires_at: null });
    res.json({ ok: true, item: record });
  } catch (err) {
    console.error('Webhook item-purchased error', err);
    res.status(500).json({ error: 'Failed to handle webhook' });
  }
});

export default router;

