const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validations.js');
const User = require('../models/UserModel');

// Routers
router.post('/register', async (req, res) => {

    // Validation check
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Email uniqueness check
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email address already exists');

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
    if(error) return res.status(400).send(error.details[0].message);

    // Email existance check
    const registeredUser = await User.findOne({email: req.body.email});
    if(!registeredUser) return res.status(400).send('User with this email does not exist');

    // Check password
    const passwordMatch = bcrypt.compareSync(req.body.password, registeredUser.password);
    if(!passwordMatch) return res.status(400).send('Email or Password do not match');

    // Create and assign JWT
    const token = jwt.sign({_id: registeredUser._id}, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
})

module.exports = router