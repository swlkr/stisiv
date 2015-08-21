var email    = require("./email"),
    template = require("./template");

const Emails = {};

Emails.files = {
  welcome: {
    html: "./emails/welcome.html",
    txt: "./emails/welcome.txt"
  },
  forgotPassword: {
    html: "./emails/forgotPassword.html",
    txt: "./emails/forgotPassword.txt"
  }
};

Emails.subjects = {
  welcome: "Welcome to visics!",
  forgotPassword: "Reset your password"
};

Emails.actions = {
  welcome: "welcome",
  forgotPassword: "forgotPassword"
};

Emails.welcome = {};
Emails.welcome.send = function(to, data, subject) {
  return Emails.send(to, data, subject, Emails.actions.welcome);
};

Emails.forgotPassword = {};
Emails.forgotPassword.send = function *(to, data, subject) {
  return yield Emails.send(to, data, subject, Emails.actions.forgotPassword);
};

Emails.send = function(to, data, subject, action) {
  return new Promise((resolve, reject) => {
    template
    .fetch(Emails.files[action].txt)
    .then((txtTemplate) => {
      return new Promise((res, rej) => {

        template
        .fetch(Emails.files[action].html)
        .then((htmlTemplate) => {
          res({ html: htmlTemplate, text: txtTemplate });
        })
        .catch(reject);
      })
    })
    .then((templates) => {
      var html = template.merge(templates.html, data);
      var text = template.merge(templates.text, data);

      return email.send(
        to,
        subject || Emails.subjects[action],
        html,
        text
      );
    })
    .then((result) => {
      resolve(result);
    })
    .catch(reject);
  });
}

module.exports = Emails;
