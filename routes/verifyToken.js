const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('auth-token'); // For any authenticated request, need to pass auth-token header
    if(!token) return res.status(401).send('Access denied')

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
    } catch (error) {
        res.status(400).send({message: error})
    }

    next();
}

module.exports= authenticateUser;