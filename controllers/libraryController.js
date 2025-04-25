import Library from '../models/library.js';


export const createLibrary = async (req, res) => {
  try {
    const newLibrary = new Library(req.body);
    await newLibrary.save();
    res.status(201).json({ message: 'Library created successfully', newLibrary });
  } catch (error) {
    res.status(500).json({ message: 'Error creating library', error: error.message });
  }
};

export const getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find({});
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching libraries', error: error.message });
  }
};

export const getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate({
      path: 'books',
      populate: {
        path: 'borrower',
        model: 'User',
      }
    });

    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching library details', error: error.message });
  }
};

export const updateLibrary = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Library updated successfully', updatedLibrary });
  } catch (error) {
    res.status(500).json({ message: 'Error updating library', error: error.message });
  }
};

export const deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    await Library.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting library', error: error.message });
  }
};
