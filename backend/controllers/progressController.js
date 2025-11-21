import Progress from '../models/Progress.js';

export const getProgress = async (req, res) => {
  try {
    const doc = await Progress.getSingleton();
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { percent, range } = req.body || {};
    const doc = await Progress.getSingleton();
    if (typeof percent === 'number') {
      doc.percent = Math.min(100, Math.max(0, percent));
    }
    if (typeof range === 'string') {
      doc.range = range;
    }
    await doc.save();
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

