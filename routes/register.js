const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register', { foo: "Register" });
});



module.exports = router;
