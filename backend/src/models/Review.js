import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  movieName: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  useremail: { type: String },
  rating: { type: Number, min: 1, max: 5, required: true }
}, { timestamps: true });

reviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.reviewId = ret._id;
    delete ret._id;
  }
});

export default mongoose.model('Review', reviewSchema, 'Reviews');
