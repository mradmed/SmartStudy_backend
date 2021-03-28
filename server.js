const express = require('express');
const bodyparser= require('body-parser');
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt_decode =require("jwt-decode") ;
dotenv.config();


//Connect to Database mongodb
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true},()=> {console.log("Connected to database :) !");});

var app =express();
app.use(bodyparser.json());

app.use('/image', express.static('upload/images'));

//forget password
app.post('/reset', (req, res) => {
    const {to, subject, text} = req.body;
    const mailData = {
        to: to,
        subject: subject,
        text: text,
        html:  '<b> Your Verification Code is : </b>' + text
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_MAILER,
            pass: process.env.PASS_MAILER
        }
    });
  
  
    transporter.sendMail(mailData, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).send({code:"200",message: "Mail Sent", message_id: info.messageId})
        }
    )
  }
  );

require("./routes/auth.js")(app);
require("./routes/forms.js")(app,jwt_decode);
require("./routes/post.js")(app,jwt_decode);



app.listen(3000, ()=> console.log('Express server is running at port no: 3000'));