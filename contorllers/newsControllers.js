const { userPreferedNewsService } = require('../services/newsServices');

const newsControllers = async (req, res) => {
    const news = await userPreferedNewsService(req.user.id);
    res.status(200).json({
        news
    })
};

module.exports = {
    newsControllers
};