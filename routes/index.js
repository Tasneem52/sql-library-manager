const express = require('express');
const router = express.Router();

// GET home homepage
router.get('/',(req,res,next) => {
  res.redirect('/books');
});


module.exports = router;
