const { checkPreferences } = require('@hapi/joi');
const User= require('../model/User');
const { registerValidation,loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



module.exports = app => {

app.post('/register',  async (req,res) => {
    //Validating with JOI
    const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password , salt);



    //Create a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        phone: req.body.phone
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({user: user._id});
        
    } catch (error) {
        res.status(400).send(error);
    }

});

app.post('/login',  async (req,res) => {
    //Validating with JOI
    const { error } = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email is not found");

    //PASSWORD IS CORRECT
    
    const validPass = await bcrypt.compare(req.body.password , user.password);
    if(!validPass) return res.status(400).send("Invalid password")

    //CREATE and ASSIGN a Token 
    const token = jwt.sign({_id: user._id,role: user.role},process.env.TOKEN_SECRET)

    res.header("auth-token",token).status(200).send(token);


});

}