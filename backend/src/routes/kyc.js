import express from 'express';
import { createDidCommit } from '../utils/crypto.js';
import auth from '../middleware/auth.js';
import { registerOrUpdateDIDOnChain } from '../services/onchain.js';

const router = express.Router();

// POST /kyc/submit (mock)
// body: { gender: 'male'|'female'|'other', birthdate: 'YYYY-MM-DD', country: 'KR' }
router.post('/submit', auth, async (req, res) => {
  try {
    const { birthdate, gender, country } = req.body || {};
    if (!birthdate || !country) return res.status(400).json({ error: 'birthdate and country required' });

    // Compute is_adult (simple: >= 18 years)
    const dob = new Date(birthdate);
    if (isNaN(dob.getTime())) return res.status(400).json({ error: 'Invalid birthdate' });
    const now = new Date();
    const age = Math.floor((now - dob) / (365.25 * 24 * 3600 * 1000));
    const isAdult = age >= 18;

    // Normalize gender enum
    const g = (gender || '').toString().toLowerCase();
    let genderEnum = 0; // unknown
    if (g === 'male' || g === 'm') genderEnum = 1;
    else if (g === 'female' || g === 'f') genderEnum = 2;
    else if (g) genderEnum = 3; // other / specified

    // Create DID commit and update DB
    const didCommit = createDidCommit(req.user._id.toString());
    req.user.did_commit = didCommit;
    req.user.is_adult = isAdult;
    req.user.gender = genderEnum;
    req.user.country_code = (country || '').toUpperCase();
    await req.user.save();

    // Mock on-chain registration call
    const countryCommit = didCommit; // placeholder until a real countryCommit is defined
    const onchain = await registerOrUpdateDIDOnChain({
      userCommit: didCommit,
      isAdult,
      gender: genderEnum,
      countryCommit,
    });

    res.json({
      ok: true,
      user: {
        id: req.user._id,
        did_commit: didCommit,
        is_adult: isAdult,
        gender: genderEnum,
        country_code: req.user.country_code,
      },
      onchain,
    });
  } catch (err) {
    console.error('KYC submit error', err);
    res.status(500).json({ error: 'Failed to process KYC' });
  }
});

export default router;

