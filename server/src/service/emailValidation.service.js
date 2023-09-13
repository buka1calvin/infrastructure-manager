import sgMail from "@sendgrid/mail";
import "dotenv/config";

const validationOTPmail = async (user, otp, token) => {
  const apikey = process.env.API_KEY;
  const url = `${process.env.VERIFYEMAIL}?token=${token}`;
  sgMail.setApiKey(apikey);
  const message = {
    to: user.email,
    from: {
      name: "WOoHo_Car",
      email: process.env.SEND_EMAIL,
    },
    subject: "Click here to confirm",
    text: "This is the message from SendGrid",
    html: `
      <html>
        <head>
          <style>
            .container {
              border: 2px;
            }
            .button {
              background-color: #2D719D;
              padding: 10px 20px;
              text-decoration: none;
              font-weight: bold;
              border-radius: 4px;
            }
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            .header{
              background-repeat: no-repeat;
              background-size: fit;
              width: 100%;
              height: 120px;
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
          <div class="container">
            <div class = "header">
              <img src='https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg' alt='header'/>
            </div>
            <h2>Click to verify your email</h2>
            <p>Copy this code: ${otp}</p>
            <a href="${url}" class="button"><span>Verify Email</span></a>
          </div>
        </body>
      </html>
    `,
  };

  sgMail
    .send(message)
    .then((res) => {
      console.log("Message sent...");
    })
    .catch((error) => console.log(error));
};

const sendDriverProfileUpdateEmail = async (user, driverData) => {
  const url = `${process.env.VERIFY_EMAIL}/${user._id}`;
  const apikey = process.env.API_KEY;
  sgMail.setApiKey(apikey);
  const { driverLicenseNumber, carPictures } = driverData;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
      display: flex;

      justify-content: center;
      align-items: center;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      height: 100vh;
    }
    .container {
      background-color: #fff;
      width: 600px;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    .table-container {
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      border: 1px solid gray;
      border-radius: 4px;
      margin-top: 20px;
    }
    th {
      text-align: start;
      color: #5157e0;
      background-color: #f2f2f2;
      padding: 8px 12px;
    }
    td {
      color: gray;
      padding: 8px 12px;
    }
    td img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    button {
      background-color: #5157e0;
      align-self: center;
      padding: 10px 30px;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 20px;
    }
    a {
      text-decoration: none;
      color: white;
    }
    ul{
        display: flex;
        gap: 15px;
    }
    li{
        list-style: none;
    }
    span{
      color:white
    }
    div {
      display: flex;
      flex-direction: column;
    }
    
    div > div:not(:first-child) {
      margin-top: 20px;
    }
  </style>
    </head>
    <body>
    <h2>Driver Profile Update Request</h2>
      <div class="container">
        <div>
        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
          <td>names</td>
          <td>${user.firstname} ${user.lastname}</td>
        </tr>
          <tr>
            <td>Driver License Number:</td>
            <td>${driverLicenseNumber}</td>
          </tr>
          <tr>
            <td>Car Pictures:</td>
            <td>
              <ul>
                ${carPictures
                  .map((picture) => `<li><img src="${picture}"/></li>`)
                  .join("")}
              </ul>
            </td>
          </tr>
        </table>
        </div>
        <div>
        <button><a href="${url}"> <span>verify<span></a></button>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: "calvinusbukaran@gmail.com",
    from: {
      name: `${user.firstname}  ${user.lastname}`,
      email: process.env.SEND_EMAIL,
    },
    subject: "Driver Profile Update Request",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("Driver profile update email sent");
  } catch (error) {
    console.error("Error sending driver profile update email:", error);
  }
};
const sendBookingEmail = async (user, driver, booking) => {
  const url = `${process.env.EMAIL_VERIFY}/${booking._id.toString()}`;
  const apikey = process.env.API_KEY;
  sgMail.setApiKey(apikey);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    body {
      display: flex;

      justify-content: center;
      align-items: center;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      height: 100vh;
    }
    button {
      background-color: #5157e0;
      padding: 10px 30px;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 20px;
      margin-left: auto;
    }
    a {
      text-decoration: none;
      color: #fff;
    }
    .span{
      font-weight: bold;
      color:gray
    }
    .box{
      box-shadow: 1px 1px 3px 5px rgb(191, 189, 189); 
      padding: 5px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
    }
    span{
      color:#fff;
    }
  </style>
    </head>
    <body>
    <div>
    <div class="box">
    <p>
    user 
          <span class="span">${user.firstname} ${user.lastname}</span> is requesting to book <span class="span">${booking.booked_seats}</span> seats in your ride 
          </p>
            </div>
        <button><a href="${url}"> <span>approve<span></a></button>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: driver.email,
    from: {
      name: `${user.firstname}  ${user.lastname}`,
      email: process.env.SEND_EMAIL,
    },
    subject: "Booking request",
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log("booking request sent");
  } catch (error) {
    console.error("Error sending driver profile update email:", error);
  }
};

export { validationOTPmail, sendDriverProfileUpdateEmail, sendBookingEmail };
