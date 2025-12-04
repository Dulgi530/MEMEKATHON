import User from '../models/User.js';

// Super simple auth: pass current user via header `x-user-id`.
export default async function auth(req, res, next) {
  try {
    const userId = req.header('x-user-id');
    if (!userId) return res.status(401).json({ error: 'Missing x-user-id header' });
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ error: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth error', err);
    res.status(500).json({ error: 'Auth failed' });
  }
}

