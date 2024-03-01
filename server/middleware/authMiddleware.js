const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['Authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { authenticateToken };
