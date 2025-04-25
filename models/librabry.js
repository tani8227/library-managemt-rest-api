import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
}, { timestamps: true });

const Library = mongoose.model('Library', librarySchema);
export default Library;
