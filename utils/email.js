const nodemailer = require("nodemailer");

const sendMail = async options => {
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USERNAME, // generated ethereal user
          pass: process.env.EMAIL_PASSWORD, // generated ethereal password
        },
      });
      const mailOptions = {
          from:'Aatir<aatirqureshi1@gmail.com>',
          to:options.email,
          subject:options.subject,
          text:options.message
      }

      await transporter.sendMail(mailOptions)
}

module.exports = sendMail