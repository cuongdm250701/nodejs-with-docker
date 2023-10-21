const node_mailer = require("nodemailer");

const send_mail = async (to, subject, content) => {
  try {
    const transporter = node_mailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const options = {
      from: process.env.USER_EMAIL,
      to: to,
      subject: subject,
      text: content,
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.log(error);
  }
};

module.exports = send_mail;
