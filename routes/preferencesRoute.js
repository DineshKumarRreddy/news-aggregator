const express = require('express');
const router = express.Router();
const { preferencesController, updatePreferencesController } = require('../contorllers/preferencesController');
const { handleAsyncCatch } = require('../utils/utils');
const { validatePreferenceUpdateSchema } = require('../utils/validationMiddleWares');

router.route('/')
    .get(handleAsyncCatch(preferencesController))
    .post((req, res) => { })
    .put(validatePreferenceUpdateSchema, handleAsyncCatch(updatePreferencesController))
    .delete((req, res) => { });


module.exports = router;