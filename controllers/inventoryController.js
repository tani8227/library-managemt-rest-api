import Library from '../models/library.js';
import Book from '../models/book.js';

export const getLibraryInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate('books');
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    res.status(200).json(library.books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching library inventory', error: error.message });
  }
};

export const addBookToInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const book = await Book.findById(req.body.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (library.books.includes(book._id)) {
      return res.status(400).json({ message: 'Book already in the inventory' });
    }

    library.books.push(book._id);
    await library.save();

    res.status(200).json({ message: 'Book added to inventory', library });
  } catch (error) {
    res.status(500).json({ message: 'Error adding book to inventory', error: error.message });
  }
};

export const removeBookFromInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const bookIndex = library.books.indexOf(req.params.bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in the inventory' });
    }

    library.books.splice(bookIndex, 1);
    await library.save();

    res.status(200).json({ message: 'Book removed from inventory', library });
  } catch (error) {
    res.status(500).json({ message: 'Error removing book from inventory', error: error.message });
  }
};
