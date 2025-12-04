import mongoose from 'mongoose';

export const ITEM_IDS = [
  'LIKE_UNLIMITED',
  'UNDO',
  'SUPERLIKE',
  'HIDE_ONCHAIN',
];

const UserItemSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    item_id: { type: String, enum: ITEM_IDS, required: true },
    expires_at: { type: Date, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const UserItem = mongoose.model('UserItem', UserItemSchema);
export default UserItem;

