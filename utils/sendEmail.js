import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

// Load env vars
dotenv.config({ path: './config/config.env'})

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port:  process.env.SMTP_PORT,
//   secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) => {

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html: "<b>Hello world?</b>", // html body
  };

  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

export default sendEmail