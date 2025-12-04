import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    social_provider: { type: String, required: true },
    social_id: { type: String, required: true },

    did_commit: { type: String, default: null }, // bytes32 hex string
    is_adult: { type: Boolean, default: null },
    gender: { type: Number, default: null }, // 0 unknown, 1 male, 2 female, 3 other
    country_code: { type: String, default: null },

    is_memex_linked: { type: Boolean, default: false },
    memex_wallet_address: { type: String, default: null },
  },
  { timestamps: true }
);

UserSchema.index({ social_provider: 1, social_id: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);
export default User;

