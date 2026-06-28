import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  userType: { type: String, enum: ['Admin', 'User'], default: 'User' },
  location: { type: String, required: true, trim: true },
  profilePicture: { type: String },
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.uid = ret._id;
    delete ret._id;
    delete ret.password;
  }
});

export default mongoose.model('User', userSchema, 'Users');