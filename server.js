require('dotenv').config({ path: './config.env' });
const app = require('./app');
const port = 3000;

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});