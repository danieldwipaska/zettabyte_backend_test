const router = require('express').Router();
const Article = require('../models/Article');

//CREATE
//validation is handled by front-end
//authentication is not included
router.post('/', async (req, res) => {
  const newArticle = new Article(req.body);
  try {
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

//GET ALL ARTICLES
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    if (articles.length === 0) {
      res.status(404).json('Article is empty');
    } else {
      res.status(200).json(articles);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
