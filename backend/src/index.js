import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import kycRoutes from './routes/kyc.js';
import statusRoutes from './routes/status.js';
import itemRoutes from './routes/items.js';
import webhookRoutes from './routes/webhook.js';
import memexRoutes from './routes/memex.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/idateu';

// Health
app.get('/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/kyc', kycRoutes);
app.use('/', statusRoutes); // /me/*
app.use('/items', itemRoutes);
app.use('/webhook', webhookRoutes);
app.use('/memex', memexRoutes);

async function start() {
  await mongoose.connect(MONGODB_URI, { dbName: 'idateu' });
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

// Only start server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  start().catch((err) => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
}

export default app;

