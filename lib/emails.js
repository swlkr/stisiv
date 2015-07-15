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
Emails.welcome.send = function *(to, data, subject) {
  return yield Emails.send(to, data, subject, Emails.actions.welcome);
};

Emails.forgotPassword = {};
Emails.forgotPassword.send = function *(to, data, subject) {
  return yield Emails.send(to, data, subject, Emails.actions.forgotPassword);
};

Emails.send = function *(to, data, subject, action) {
  var txtTemplate = yield template.fetch(Emails.files[action].txt);
  var htmlTemplate = yield template.fetch(Emails.files[action].html);

  var txtEmail = template.merge(txtTemplate, data);
  var htmlEmail = template.merge(htmlTemplate, data);

  email.send(
    to,
    subject || Emails.subjects[action],
    txtEmail,
    htmlEmail
  );
}

module.exports = Emails;
