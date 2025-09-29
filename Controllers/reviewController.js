const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const review = new Review({
    book: req.params.id,
    user: req.user._id,
    rating: req.body.rating,
    comment: req.body.comment
  });
  await review.save();
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review || (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  review.rating = req.body.rating;
  review.comment = req.body.comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.reviewId);
  if (!review || (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};