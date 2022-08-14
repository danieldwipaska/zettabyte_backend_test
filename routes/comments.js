const router = require('express').Router();
const Comment = require('../models/Comment');

//validation is handled by front-end

//CREATE
//authentication is not included
router.post('/', async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put('/:id', async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        fullname: comment.fullname,
        content: comment.content,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json('The comment has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMMENTS
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) {
      res.status(404).json('Comment is empty');
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL COMMENTS OF AN ARTICLE
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    if (comments.length === 0) {
      res.status(404).json('Comment of the article is empty');
    } else {
      res.status(200).json(comments);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
