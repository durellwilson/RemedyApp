const Remedy = require('../models/remedy');

const errorResponse = (error, res) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

exports.createRemedy = async (req, res) => {
  try {
    const newRemedy = new Remedy(req.body);
    const savedRemedy = await newRemedy.save();
    res.status(201).json(savedRemedy);
  } catch (err) {
    errorResponse(err, res);
  }
};

exports.getRemedies = async (req, res) => {
  try {
    const query = {};
    // Add query filters if needed
    const remedies = await Remedy.find(query);
    res.status(200).json(remedies);
  } catch (err) {
    errorResponse(err, res);
  }
};

exports.getRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findById(req.params.id);
    if (!remedy) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.status(200).json(remedy);
  } catch (err) {
    errorResponse(err, res);
  }
};

exports.updateRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!remedy) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.status(200).json(remedy);
  } catch (err) {
    errorResponse(err, res);
  }
};

exports.deleteRemedy = async (req, res) => {
  try {
    const result = await Remedy.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.status(204).send();
  } catch (err) {
    errorResponse(err, res);
  }
};
