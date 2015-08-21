var config       = require("../config.js"),
    acid         = require("acidjs")(config.db.url),
    validator    = require("validator"),
    bcrypt       = require("bcrypt"),
    Constants    = require("./constants"),
    Messages     = require("./messages"),
    uuid         = require("uuid"),
    emitter      = require("../lib/emitter"),
    Emails       = require("./emails");

var Users = emitter();

Users.on("insert", function(email, password) {
  Users.emit("validate", email, password);
});

Users.on("validate", function(email, password) {
  if(!validator.isEmail(email)) {
    Users.emit("error", { status: 422, message: Messages.InvalidEmail })
    return;
  }

  if(!password || (password.length < Constants.MIN_PASSWORD_LENGTH || password.length > Constants.MAX_PASSWORD_LENGTH)) {
    Users.emit("error", { status: 422, message: Messages.PasswordTooShort });
    return;
  }

  Users.emit("validated", email, password);
})

// Check for uniqueness
Users.on("validated", (email, password) => {
  acid
  .where("views.users", "email = $1", email)
  .then((rows) => {
    if(rows.length > 0) {
      Users.emit("error", { message: Messages.UserExists });
    } else {
      Users.emit("unique", email, password);
    }
  })
  .catch((error) => {
    Users.emit("error", error);
  });
});

// Insert user into the database
Users.on("unique", (email, password) => {
  // Hash the password
  var hashedPassword = bcrypt.hashSync(password, Constants.HASH_LENGTH);

  // Create event data
  var event = {
    id: uuid.v4(),
    action: "create",
    email: email,
    password: hashedPassword,
    confirmation_token: Math.random().toString(36).slice(2),
    created_at: new Date()
  };

  acid
  .insert("events", { view: "users", data: JSON.stringify(event) })
  .then((rows) => {
    var user = rows[0].data;

    // Send email
    var confirmationUrl = `${config.app.origin}/users/${user.confirmation_token}/confirm`;
    Emails.emit("send", "welcome", user.email, { confirmationUrl })

    // Emit created event
    Users.emit("inserted", user);
  })
  .catch((error) => {
    Users.emit("error", error);
  })
});

module.exports = Users;
