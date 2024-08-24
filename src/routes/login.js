const express = require('express');
const router = express.Router();
const sessionModel = require('../models/session');


router.get('/', async(req, res) => {
  const {sessionId } = req.cookies;


  if(!sessionId){
    res.render('login')
  }

  let sessionDoc = await sessionModel.findOne({sessionId: sessionId});

  if(!sessionDoc){
    res.render('login');
  }

  res.render('login', {session: sessionDoc});


});



module.exports = router;
