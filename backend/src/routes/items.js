import express from 'express';
import auth from '../middleware/auth.js';
import UserItem, { ITEM_IDS } from '../models/UserItem.js';

const router = express.Router();

// POST /items/purchase/fiat
// body: { item_id, duration_days? }
router.post('/purchase/fiat', auth, async (req, res) => {
  try {
    let { item_id, duration_days } = req.body || {};
    if (!ITEM_IDS.includes(item_id)) return res.status(400).json({ error: 'invalid item_id' });
    duration_days = Number(duration_days || 0);

    const expires = duration_days > 0 ? new Date(Date.now() + duration_days * 24 * 3600 * 1000) : null;
    const record = await UserItem.create({ user_id: req.user._id, item_id, expires_at: expires });

    res.json({ ok: true, item: record });
  } catch (err) {
    console.error('Fiat purchase error', err);
    res.status(500).json({ error: 'Failed to record purchase' });
  }
});

// GET /me/items
router.get('/me', auth, async (req, res) => {
  const now = new Date();
  const items = await UserItem.find({ user_id: req.user._id, $or: [{ expires_at: null }, { expires_at: { $gt: now } }] })
    .sort({ createdAt: -1 });
  res.json({ items });
});

export default router;

