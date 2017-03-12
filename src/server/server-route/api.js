const express = require('express');


const router = new express.Router();

router.get('/home', (req, res) => {
  res.status(200).json({
    message: "You're already signed in."
  });
});


module.exports = router;
