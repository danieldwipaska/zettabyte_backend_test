const router = require('express').Router();

//TEST
router.get('/', (req, res) => {
  res.json('This is Article Route');
});

module.exports = router;
