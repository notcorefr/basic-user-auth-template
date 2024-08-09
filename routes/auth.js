const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    // const {username, password}= req.body;
    console.log(req.body);

    res.send({
        success: true
    })
    
});



module.exports = router;
