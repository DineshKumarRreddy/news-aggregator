const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute');
const preferencesRoute = require('./routes/preferencesRoute');
const newsRoute = require('./routes/newsRoute');
const { isUserAthenticated } = require('./contorllers/authController');
const { handleAsyncCatch, errorController } = require('./utils/utils');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', authRoute);
app.use(handleAsyncCatch(isUserAthenticated));
app.use('/users/preferences', preferencesRoute);
app.use('/news', newsRoute);

app.all('*', (req, res, next) => {
    next({ status: 404, message: "page not found", });
});

app.use(errorController);
module.exports = app;