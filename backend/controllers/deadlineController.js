import Deadline from '../models/Deadline.js';

export const getDeadlines = async (req, res) => {
  try {
    const deadlines = await Deadline.find().sort({ left: 1, createdAt: -1 });
    res.json(deadlines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDeadline = async (req, res) => {
  try {
    const deadline = new Deadline(req.body);
    const savedDeadline = await deadline.save();
    res.status(201).json(savedDeadline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDeadline = async (req, res) => {
  try {
    const deadline = await Deadline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json(deadline);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDeadline = async (req, res) => {
  try {
    const deadline = await Deadline.findByIdAndDelete(req.params.id);
    if (!deadline) return res.status(404).json({ message: 'Deadline not found' });
    res.json({ message: 'Deadline deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
