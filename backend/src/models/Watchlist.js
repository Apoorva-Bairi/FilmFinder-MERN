import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  movieName: { type: String, required: true },
  moviePicture: {
  type: String
},
  uid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  isAddedToWatchlist: { type: Boolean, default: true }
}, { timestamps: true });

watchlistSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.watchlistId = ret._id;
    delete ret._id;
  }
});

export default mongoose.model('Watchlist', watchlistSchema, 'Watchlist');
