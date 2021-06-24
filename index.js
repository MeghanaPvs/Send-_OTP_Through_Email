const express = require('express')
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
// const path = require('path')

const app = express();


// body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//OTP 

 var email;
// var otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);

var digits= '0123456789abcdefghijklmnopqrstuvwxyz';
    var otplength = 4;
    var otp = '';
    for(let i=1; i<=otplength; i++)
    {
     var val= Math.floor(Math.random()*(digits.length));
     //var val = Math.floor(1000 + Math.random() * 9000);
     //floor used to print nearest int value.
     otp = otp +digits[val];
    }
    console.log('OTP',otp);

//Sending Email
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'pvsmeghana@gmail.com',
        pass: 'abcdefgh@123',
    }

});

app.get('/otp', function (req, res) {
    email = req.body.email;
    // send mail with defined transport object
    var mailOptions = {
        to: 'pvsmeghana@gmail.com',
        subject: "Dynamic OTP: ",
        html: "<h3>OTP is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.render('otp');
    });
});

//defining port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`app is live at ${PORT}`);
})


//Postman:
//Get:http://localhost:3000/otp
//Gmail:Enable Less secure apps option to receive OTP


