import Book from "../models/book.js";

export const createBook = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const book = await Book.create(req.body);
    return res.status(200).json({
      message: "Book created successfully!",
      book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating book",
      error: error.message,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({})
      .populate("library")
      .populate("author")
      .populate("borrower");
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("library")
      .populate("author")
      .populate("borrower");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching book details",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this book" });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
};
