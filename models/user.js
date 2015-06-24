const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      bcrypt    = require("bcrypt"),
      validator = require("validator"),
      jwt       = require("jsonwebtoken"),
      emails    = require("../lib/emails");

const PASSWORD_LENGTH      = 13,
      PASSWORD_HASH_LENGTH = 8,
      MAX_PASSWORD_LENGTH  = 100,
      ONE_WEEK             = 10080;

const table = {
  users: "users"
};

const User = {};

const messages = {
  invalid: {
    email: "You need to use an actual email address",
    password: "Your password needs to be longer than " + PASSWORD_LENGTH +  " characters",
    password_too_long: "Your password can't be longer than " + MAX_PASSWORD_LENGTH + " characters",
    "duplicate key value violates unique constraint 'users_email_key'": "You've already signed up!"
  }
};

function hasValidPassword(password) {
  return password.length >= PASSWORD_LENGTH && password.length < 100;
}

function hasValidEmail(email) {
  return validator.isEmail(email);
}

function hashPassword(password) {
  return bcrypt.hashSync(password, PASSWORD_HASH_LENGTH);
}

User.confirm = function *(token) {
  var rows = yield acid.update(table.users, { confirmed_at: new Date() }, "confirmation_token = $1", token);
  var user = rows[0];

  return {
    id: user.id,
    email: user.email,
    confirmed_at: user.confirmed_at
  };
};

User.create = function *(email, password) {
  // Business logic to create a user:

  // 1. Check for a valid email and password
  // 2. Hash the password
  // 3. Create the user
  // 4. Create a user email
  // 5. Generate an auth token

  if(!hasValidEmail(email)) {
    throw { message: messages.invalid.email, status: 422 };
  }

  if(!hasValidPassword(password)) {
    throw { message: messages.invalid.password, status: 422 };
  }

  var hashedPassword = hashPassword(password);

  var data = {
    email: email,
    password: hashedPassword,
    confirmation_token: Math.random().toString(36).slice(2) // generate random alphanumeric string
  };

  // TODO: Handle duplicate emails
  var rows = yield acid.insert(table.users, data);
  var user = rows[0];

  // create confirmation_url
  // fire off a welcome email
  var confirmationUrl = config.app.origin + "/users/" + user.confirmation_token + "/confirm";
  yield emails.welcome.send(user.email, { confirmationUrl: confirmationUrl });

  var token = jwt.sign(
    { id: user.id },
    config.app.secret,
    {
      expiresInMinutes: ONE_WEEK,
      issuer: user.email
    }
  );

  return {
    token: token,
    user: {
      id: user.id,
      email: user.email,
    }
  };
};

module.exports = User;
