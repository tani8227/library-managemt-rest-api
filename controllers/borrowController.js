import Book from '../models/book.js';
import User from '../models/customer.js';

export const borrowBook = async (req, res) => {
  try {
    const { bookId, charge } = req.body; 
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.borrowed) {
      return res.status(400).json({ message: 'Book already borrowed' });
    }

    book.borrowed = true;
    book.borrower = req.user._id;
    book.borrowedDate = new Date();

    const user = await User.findById(req.user._id);
    if (user.balance < charge) {
      return res.status(400).json({ message: 'Insufficient balance to borrow the book' });
    }

    user.balance -= charge;
    await user.save();
    await book.save();

    res.status(200).json({
      message: 'Book borrowed successfully',
      book,
      charge,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book', error: error.message });
  }
};


export const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (!book.borrowed || book.borrower.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'This book was not borrowed by you' });
    }

 
    book.borrowed = false;
    book.borrower = null;
    book.returnDate = new Date();

 
    const user = await User.findById(req.user._id);
    const chargeRefund = 5; 
    user.balance += chargeRefund;
    await user.save();
    await book.save();

    res.status(200).json({
      message: 'Book returned successfully',
      book,
      chargeRefund,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book', error: error.message });
  }
};
