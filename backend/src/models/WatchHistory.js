import mongoose from 'mongoose';

const watchHistorySchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    movieName: {
      type: String,
      required: true
    },
    moviePicture: {
      type: String
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    watchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

watchHistorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.historyId = ret._id;
    delete ret._id;
  }
});

export default mongoose.model('WatchHistory', watchHistorySchema, 'WatchHistory');