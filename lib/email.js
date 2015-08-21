const config  = require("../config"),
      mailgun = require("mailgun-js")({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain});

const Email = {};

/*
This function sends email
*/
Email.send = function(to, subject, text, html) {

  var data = {
    to: to,
    from: config.mailgun.from,
    subject: subject,
    text: text,
    html: html
  };

  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, function (error, body) {
      if(error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

module.exports = Email;
