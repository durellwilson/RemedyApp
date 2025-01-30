const express = require('express');
const router = express.Router();
const {
  createRemedy,
  getRemedies,
  getRemedy,
  updateRemedy,
  deleteRemedy
} = require('../controllers/remedyController');

router.post('/', createRemedy);
router.get('/', getRemedies);
router.get('/:id', getRemedy);
router.put('/:id', updateRemedy);
router.delete('/:id', deleteRemedy);

module.exports = router;
