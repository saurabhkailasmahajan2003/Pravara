import Holiday from '../models/Holiday.js';

export const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHoliday = async (req, res) => {
  try {
    const holiday = new Holiday(req.body);
    const savedHoliday = await holiday.save();
    res.status(201).json(savedHoliday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    res.json(holiday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) return res.status(404).json({ message: 'Holiday not found' });
    res.json({ message: 'Holiday deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
