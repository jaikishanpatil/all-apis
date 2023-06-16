function errorHandler(err, req, res, next) {
    if (typeof (err) == 'string') {
        // custome application error
        return res.status(400).json({ message: err });
    }
    if (err?.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token.' });
    }
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;