const express = require('express');
const router = express.Router();
const {handleGenrateUrl} = require('../controllers/url')

router.post('/',handleGenrateUrl);

module.exports = router;