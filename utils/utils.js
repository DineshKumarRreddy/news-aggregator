const AppException = require('./AppExceptions');
const handleAsyncCatch = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            next(new AppException(err.statusCode || 404, err.message));
        });
    }
}

const errorController = (err, req, res, next) => {
    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
    })
}

const customPromisify = fn => {
    return (...args) => new Promise((res, rej) => {
        setTimeout(() => {
            res(fn(...args));
        }, 1500);
    });
};

module.exports = {
    handleAsyncCatch,
    errorController,
    customPromisify
}