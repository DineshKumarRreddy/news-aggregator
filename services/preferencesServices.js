const { users } = require('../users.json');
const { customPromisify } = require('../utils/utils');

const getPreferenceIndex = (id) => users.findIndex(user => user.id === id);

const userPreferencesServices = customPromisify((id) => {
    return users[getPreferenceIndex(id)].preferences;
});

const updatePreferencesServices = customPromisify((id, preferences) => {
    const user = users[getPreferenceIndex(id)];
    user.preferences = preferences;
    return user.preferences;
});

module.exports = {
    userPreferencesServices,
    updatePreferencesServices
};