const express = require('express');
const { addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/:id/reviews', protect, addReview);
router.put('/:id/reviews/:reviewId', protect, updateReview);
router.delete('/:id/reviews/:reviewId', protect, deleteReview);

module.exports = router;