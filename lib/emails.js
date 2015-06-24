var email    = require("./email"),
    template = require("./template");

const Emails = {};

Emails.files = {
  welcome: {
    html: "./emails/welcome.html",
    txt: "./emails/welcome.txt"
  }
};

Emails.subjects = {
  welcome: "Welcome to visics!"
};

Emails.welcome = {};
Emails.welcome.send = function *(to, data, subject) {
  var welcomeTxt = yield template.fetch(Emails.files.welcome.txt);
  var welcomeHtml = yield template.fetch(Emails.files.welcome.html);

  var welcomeTxtEmail = template.merge(welcomeTxt, data);
  var welcomeHtmlEmail = template.merge(welcomeHtml, data);

  email.send(
    to,
    subject || Emails.subjects.welcome,
    welcomeTxtEmail,
    welcomeHtmlEmail
  );
};

module.exports = Emails;
