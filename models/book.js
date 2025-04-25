
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true },
  borrowed: { type: Boolean, default: false },
  charge: { type: Number, default: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
