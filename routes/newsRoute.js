const express = require('express');
const router = express.Router();
const { newsControllers } = require('../contorllers/newsControllers');
const { handleAsyncCatch } = require('../utils/utils');

router.route('/').get(handleAsyncCatch(newsControllers))

module.exports = router;