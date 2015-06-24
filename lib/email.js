const config  = require("../config"),
      mailgun = require("mailgun-js")({apiKey: config.mailgun.apiKey, domain: config.mailgun.domain}),
      q       = require("q");

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

  var deferred = q.defer();

  mailgun.messages().send(data, function (error, body) {
    if(error) {
      deferred.reject(error);
    } else {
      deferred.resolve(body);
    }
  });

  return deferred.promise;
};

module.exports = Email;
