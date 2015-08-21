var config    = require("../config"),
    Messages  = require("./messages"),
    Constants = require("./constants"),
    bcrypt    = require("bcrypt"),
    acid      = require("acidjs")(config.db.url),
    jwt       = require("jsonwebtoken");

var Token = {};

Token.create = function(email, password) {
  if(!email || !password) {
    return new Promise((_, reject) => {
      reject({ status: 401, message: Messages.AllParametersMissing });
    });
  }

  // Fetch the user with the email
  return new Promise((resolve, reject) => {
    acid
    .where("users", "email = $1", email)
    .then((rows) => {
      if(rows.length === 0) {
        reject({ status: 404, message: Messages.UserNotFound });
        return;
      }

      var user = rows[0];
      // Check for the correct password
      if(!bcrypt.compareSync(password, user.password)) {
        reject({ status: 401, message: Messages.WrongPassword });
        return;
      }

      var token = jwt.sign({ id: user.id }, config.app.secret, {
        expiresInMinutes: Constants.ONE_WEEK,
        issuer: user.email
      });

      resolve({ token });
    })
    .catch(reject);
  });
};

module.exports = Token;
