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

//DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json('The article has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL ARTICLES
// router.get('/', async (req, res) => {
//   try {
//     const articles = await Article.find();
//     if (articles.length === 0) {
//       res.status(404).json('Article is empty');
//     } else {
//       res.status(200).json(articles);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ARTICLES BY CATEGORY (FILTER & SORT BY POSTING DATE NEWEST TO OLDEST)
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const category = req.query.category;
  try {
    if (category) {
      const articleTotal = await Article.find({ categories: category });
      const count = articleTotal.length;
      const articles = await Article.find({ categories: category })
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).json({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } else {
      const count = await Article.countDocuments();
      const articles = await Article.find()
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.status(200).json({
        articles,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
