const router = require('express').Router()
const {registerValidation, loginValidation} = require('../validations.js')
const User = require('../models/UserModel')

// Routers
router.post('/register', async (req, res) => {

    // Validation check
    const {error} = registerValidation(req.body);
    if(error) return res.send(error.details[0].message).status(400);

    // Email uniqueness check
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.send('Email address already exists').status(400);

    // Save user
    const user = User({
       email: req.body.email,
       name: req.body.name,
       password: req.body.password
    });

    try {
        const newUser = await user.save()
        res.send(newUser);
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router