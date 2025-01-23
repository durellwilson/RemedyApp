const Remedy = require('../models/remedy');

exports.createRemedy = async (req, res) => {
  try {
    const remedy = new Remedy(req.body);
    await remedy.save();
    res.status(201).json(remedy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRemedies = async (req, res) => {
  try {
    const remedies = await Remedy.find();
    res.json(remedies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findById(req.params.id);
    if (!remedy) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.json(remedy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(remedy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRemedy = async (req, res) => {
  try {
    await Remedy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Remedy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
