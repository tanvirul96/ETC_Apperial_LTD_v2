const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided.' });

    const bearerToken = token.split(' ')[1]; // "Bearer <token>"

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Failed to authenticate token.' });
        
        req.user = decoded; // Standardize as req.user
        req.userId = decoded.id; // Keep legacy for compatibility
        req.userRole = decoded.role;
        next();
    });
}

function verifyAdmin(req, res, next) {
    if (req.userRole !== 'admin' && req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Require Admin Role!' });
    }
    next();
}

module.exports = {
    verifyToken,
    verifyAdmin
};
