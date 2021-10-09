const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validations.js');
const User = require('../models/UserModel');

// Routers
router.post('/register', async (req, res) => {

    // Validation check
    const {error} = registerValidation(req.body);
    if(error) return res.send(error.details[0].message).status(400);

    // Email uniqueness check
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.send('Email address already exists').status(400);

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Save user
    const user = User({
       email: req.body.email,
       name: req.body.name,
       password: hashedPassword
    });

    try {
        const newUser = await user.save()
        res.send({user: newUser._id});
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/login', async (req, res) => {

    // Validation check
    const {error} = loginValidation(req.body);
    if(error) return res.send(error.details[0].message).status(400);

    // Email existance check
    const registeredUser = await User.findOne({email: req.body.email});
    if(!registeredUser) return res.send('User with this email does not exist').status(400);

    // Check password
    const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
    if(!passwordMatch) return res.send('Email or Password do not match').status(400);

    // Create and assign JWT
    const token = jwt.sign({_id: registeredUser._id}, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
})

module.exports = router