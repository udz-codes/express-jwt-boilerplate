const router = require('express').Router();
const authenticateUser = require('./verifyToken');

// using authenticateUser as a midddleware for validation
router.get('/', authenticateUser,(req, res) => {
    res.send(req.user)
})

module.exports = router