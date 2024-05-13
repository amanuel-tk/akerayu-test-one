const nodemailer = require('nodemailer')
const { approved, pending, rejected, welcome, admin } = require('./EmailTemp')
function sendEmail(email, subject, data, type) {
  let emailConfig = {
    service: 'gmail',
    auth: {
      user: 'akerayu0@gmail.com',
      pass: 'cuvlrilkoqhihhdr',
    }
  }
  function typeOfEmail(status) {
    if (status === "published") {
      return approved(data)
    }
    else if (status === "pending") {
      return pending()
    }
    else if (status === "rejected") {
      return rejected(data)
    }
    else if (status === "welcome") {
      return welcome()
    }
    else if (status === "admin") {
      return admin(data)
    }
  }


  let message = {
    from: '<akerayu0@gmail.com>',
    to: email,
    subject: subject,
    html: typeOfEmail(type)

  }

  let transporter = nodemailer.createTransport(emailConfig);

  transporter.sendMail(message).then(() => {
    console.log("okay")
  }).catch(error => {
    console.log("Error occurred while sending email:", error);
  })
}
module.exports = {
  sendEmail
}