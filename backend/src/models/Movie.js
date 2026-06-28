import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  movieName: { type: String, required: true },
  cast: [{ type: String }],
  genre: [{ type: String }],
  directorName: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  synopsis: { type: String, required: true },
  moviePicture: { type: String },
  duration: { type: String, required: true },
  language: { type: String, required: true }
}, { timestamps: true });

movieSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.movieId = ret._id;
    delete ret._id;
  }
});

export default mongoose.model('Movie', movieSchema, 'Movies');
