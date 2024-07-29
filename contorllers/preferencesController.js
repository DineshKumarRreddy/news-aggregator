const { userPreferencesServices, updatePreferencesServices } = require('../services/preferencesServices');

const preferencesController = async (req, res) => {
    const preferences = await userPreferencesServices(req.user.id);
    res.status(200).json({
        preferences
    });
};

const updatePreferencesController = async (req, res) => {
    const preferences = await updatePreferencesServices(req.user.id, req.body.preferences);
    res.status(200).json({
        preferences
    });
}

module.exports = {
    preferencesController,
    updatePreferencesController
}