const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/middleware');
router.get('/', checkToken, (req,res)=> {
    res.status(200).json({messageRes : "Protect Access Gived"})
});

module.exports = router