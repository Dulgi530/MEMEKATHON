import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /auth/social/callback
// body: { provider, social_id }
router.post('/social/callback', async (req, res) => {
  try {
    const { provider, social_id } = req.body || {};
    if (!provider || !social_id) return res.status(400).json({ error: 'provider and social_id required' });

    let user = await User.findOne({ social_provider: provider, social_id });
    if (!user) {
      user = await User.create({ social_provider: provider, social_id });
    }

    // Return user and indicate how to authenticate subsequent requests.
    res.json({
      user: user.toObject(),
      auth: { header: 'x-user-id', value: user._id.toString() },
    });
  } catch (err) {
    console.error('Auth callback error', err);
    res.status(500).json({ error: 'Failed social callback' });
  }
});

export default router;

