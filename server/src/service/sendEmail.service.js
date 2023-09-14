
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import sgMail from '@sendgrid/mail';
import 'dotenv/config';

const apiKey = process.env.API_KEY;
sgMail.setApiKey(apiKey);

const sendEmail = (sendToEmail, subject, HTMLText) => {
  const message = {
    to: sendToEmail,
    from: {
      name: 'WooHoo Car',
      email: process.env.SEND_EMAIL
    },
    subject,

    html: HTMLText

  };
  sgMail
    .send(message)
    .then((res) => console.log('email sent...'))
    .catch((error) => {
      console.log(error.message);
    });
};


const sendVerificationEmail = async (email, name, token) => {
  const link = `${process.env.APP_URL}/auth/verify?token=${token}`;
  const msg = {
    to: email,
    from: {
      name: 'WooHoo Car',
      email: process.env.SEND_EMAIL
    },
    subject: 'Please verify your email adress',
    html: `<html>
    <head>
    <style>
    .controler{
     display: flex;
     justify-content: center;
     align-items: center;
     background-color: gainsboro;
    }
    .container {
      border: 2px;
    }
    .button {
      background-color: #9B51E0;
      padding: 10px 20px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 4px;
    }
    .button:hover{
     background-color: #8a7a99;
    }
    .container-full{
      background-color: white;
      border-radius: 4px;
      box-shadow: 8px white;
      position: relative;
      opacity: 70%;
      width: 60%;
      padding: 8px 8px 8px 8px;
      margin: auto;
    }
    .container-small{
     position: absolute;
     border-radius: 4px 4px 0px 0px;
     top: 0;
     left: 0;
     background-color: #9B51E0;
     width: 100%;
     height: 18%;
    }
    img{
      width: 200%;
      height: 100%;
      object-fit: cover;
    }
    .header{
      background-repeat: no-repeat;
      background-size: fit;
      width: 50%;
      height: 30%;
    }
    a{
      text-decoration: none;
      color: white;
    }
    span{
      color: #fff;
    }
  </style>
   </head>
   <body>
   <div class="controler">
    <div class="container-full">
    <div class="container-small" style="display: flex;">
        <p style="color: aliceblue; font-family: 'Courier New', Courier, monospace; padding: 20px;">Have You Heard? <br> Alive Now!</p> 
        <span style="padding: 12px; font-size: 30px;text-align: center; margin-left: 10px;">WooHo Car</span></div>
    <div style='font-size: 12px'><strong> <h3>Hi ${name}<h3/><br> <br>
    <div class = "header">
    <img src='https://res.cloudinary.com/dd92qmql1/image/upload/v1691336305/DEV/ox1vmk1b32f1vnjtumom.png' alt='header'/>
    </div><br> <br>
    <div class="container">
    <h3>Please click  here to verify your email.</h3>
    <a href="${link}" class="button"><span>Verify Email</span></a>
    </div>
    <br> <br>Remember, beware of scams and keep this one-time verification link confidential.<br>
    </strong><br>WooHoo Car</div>
    </div>
    </div>
    </body>
    </html>
  `
  };

  try {
    const result = await sgMail.send(msg);
    console.log('email sent');
    return result;
  } catch (error) {
    console.log(error);
  }
};
export  {sendVerificationEmail, sendEmail};
