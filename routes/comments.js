const router = require('express').Router();

//TEST
router.get('/', (req, res) => {
  res.json('This is Comment Route');
});

module.exports = router;
