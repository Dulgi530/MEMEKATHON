import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /me/did-status
router.get('/me/did-status', auth, async (req, res) => {
  const u = req.user;
  res.json({
    did_registered: Boolean(u.did_commit),
    did_commit: u.did_commit,
    is_adult: u.is_adult,
    gender: u.gender,
    country_code: u.country_code,
    onchain_status: u.did_commit ? 'submitted' : 'none',
  });
});

export default router;

