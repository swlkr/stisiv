var config   = require("../config.js"),
    acid     = require("acidjs")(config.db.url),
    Template = require("../lib/template"),
    email    = require("../lib/email"),
    emitter  = require("../lib/emitter"),
    uuid     = require("uuid");

var subjects = {
  welcome: "Welcome to visics!"
};

var files = {
  welcome: {
    html: "./emails/welcome.html",
    text: "./emails/welcome.txt"
  }
};

var Emails = emitter();

Emails.on("merge templates", (action, to, data, subject, htmlTemplate, textTemplate) => {
  var html = Template.merge(htmlTemplate, data);
  var text = Template.merge(textTemplate, data);
  var subj = subject || subjects[action];

  email
  .send(to, subj, html, text)
  .then((result) => {
    Emails.emit("sent", to, subj, data, html, text, result);
  })
  .catch((error) => {
    Emails.emit("error", error);
  });
});

Emails.on("html fetched", (action, to, data, subject, html) => {
  Template
  .fetch(files[action].text)
  .then((text) => {
    Emails.emit("merge templates", action, to, data, subject, html, text);
  })
  .catch((error) => {
    Emails.emit("error", error);
  })
});

Emails.on("send", (action, to, data, subject) => {
  Template
  .fetch(files[action].html)
  .then((html) => {
    Emails.emit("html fetched", action, to, data, subject, html);
  })
  .catch((error) => {
    Emails.emit("error", error);
  });
});

Emails.on("sent", (to, subject, data, html, text, result) => {
  var event = {
    id: uuid.v4(),
    action: "sent",
    to,
    result,
    created_at: new Date()
  };

  acid
  .insert("events", { view: "emails", data: JSON.stringify(event) })
  .then((rows) => {
    Emails.emit("logged", rows[0].data);
  })
  .catch((error) => {
    Emails.emit("error", error);
  })
});

Emails.on("logged", (event) => {
  console.log(event);
});

Emails.on("error", (error) => {
  console.log(error);
});

module.exports = Emails;
