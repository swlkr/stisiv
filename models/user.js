const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      bcrypt    = require("bcrypt"),
      validator = require("validator"),
      jwt       = require("jsonwebtoken");

const PASSWORD_LENGTH      = 7,
      PASSWORD_HASH_LENGTH = 7,
      ONE_WEEK             = 10080;

const User = acid.Model("users");

const messages = {};
messages.invalid = {
  email: "You need to use an actual email address",
  password: "Your password needs to be longer than 7 characters",
  login: "Wrong passwords don't fly around here",
  "duplicate key value violates unique constraint 'users_email_key'": "You've already signed up!"
};
User.messages = messages;

User.define("isValid", function() {
  return this.hasValidEmail() && this.hasValidPassword();
});

User.define("hasValidPassword", function() {
  this.errors = [];
  if(this.password.length <= PASSWORD_LENGTH) {
    this.errors.push(messages.invalid.password);
  }

  return this.errors.length === 0;
});

User.define("hasValidEmail", function() {
  this.errors = [];
  if(!validator.isEmail(this.email)) {
    this.errors.push(messages.invalid.email);
  }

  return this.errors.length === 0;
});

User.define("hasCorrectPassword", function(password) {
  this.errors = [];
  if(!bcrypt.compareSync(password, this.password)) {
    this.errors.push(messages.invalid.login);
  }

  return this.errors.length === 0;
});

User.define("hashPassword", function() {
  this.password = bcrypt.hashSync(this.password, PASSWORD_HASH_LENGTH);
});

User.create = function *(email, password) {
  // TODO: Find a better place for this?

  // Business logic to create a user:

  // 1. Check for a valid email and password
  // 2. Hash the password
  // 3. Create the user
  // 4. Create a user email
  // 5. Generate an auth token

  var user = new User({
    email: email,
    password: password
  });

  if(!user.isValid()) {
    throw ({message: user.errors.join(", "), status: 422});
  }

  user.hashPassword();

  // This might throw an error
  var savedUser = yield user.save();

  var token = jwt.sign(
    { id: savedUser.id },
    config.app.secret,
    {
      expiresInMinutes: ONE_WEEK,
      issuer: savedUser.email
    }
  );

  return {
    token: token,
    user: {
      id: savedUser.id,
      email: savedUser.email,
    }
  };
};

module.exports = User;
