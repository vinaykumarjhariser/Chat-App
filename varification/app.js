const express = require('express');
const mongoose = require('mongoose');
const app = express()
const userApi = require("./model/user");
const otpGenerator = require('otp-generator')
// const nodemailer = require('./service/nodemailer');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

app.use(express.json());
const controller= require('./controller/controller.js');

// app.use('/user',userApi);
const port = 8000

// Post method
app.post('/signup', controller.signup);

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'vinayjha1998@gmail.com',
        pass: 'vinayjha@2020',
    }

});

app.post('/send', controller.send);

app.post('/verify', controller.verify);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


  
