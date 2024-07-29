const { users } = require('./../users.json');
const { articles } = require('./../news.json');
const { customPromisify } = require('../utils/utils');

const userPreferedNewsService = customPromisify((id) => {
    const { preferences } = users.find(user => user.id === id);
    return articles.filter(article => preferences.includes(article.category));
});

module.exports = {
    userPreferedNewsService
}