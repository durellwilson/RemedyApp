const express = require('express');
const router = express.Router();
const {
  createRemedy,
  getRemedies,
  getRemedy,
  updateRemedy,
  deleteRemedy
} = require('../controllers/remedyController');

// Base path should be /api/remedies
router.route('/')
  .post(createRemedy)
  .get(getRemedies);

router.route('/:id')
  .get(getRemedy)
  .put(updateRemedy)
  .delete(deleteRemedy);

module.exports = router;
