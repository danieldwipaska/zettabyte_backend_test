const router = require('express').Router();
const Article = require('../models/Article');

//validation is handled by front-end

//CREATE
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
router.put('/:id', async (req, res) => {
  const article = new Article(req.body);
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      {
        author: article.author,
        title: article.title,
        desc: article.desc,
        img: article.img,
        imgType: article.imgType,
        categories: article.categories,
        content: article.content,
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
