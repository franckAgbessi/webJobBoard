const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token)
    {
        return res.status(401).json({ error: 'error access token' });
    }
    try {
        const tokenInformation = jwt.verify(token, 'key');
        req = tokenInformation;
        next();
    } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
    }
 };

module.exports = checkToken;