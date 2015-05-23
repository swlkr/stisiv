const config    = require("../config"),
      bcrypt    = require("bcrypt"),
      acid      = require("acidjs")(config.db.url),
      jwt       = require("jsonwebtoken"),
      ONE_WEEK  = 10080;

const messages = {
  missingParameters: "Come on! You can't just leave 'em blank!",
  notFound: "Terribly sorry but we couldn't find you",
  login: "Wrong passwords don't fly around here"
};

const table = {
  users: "users"
};

function hasCorrectPassword(entered, stored) {
  return bcrypt.compareSync(entered, stored);
}

const Token = {
  create: function *(email, password) {
    if(!email || !password) {
      throw { status: 401, message: messages.missingParameters };
    }

    const rows = yield acid.where(table.users, "email = $1", email);

    if(rows.length === 0) {
      throw { status: 404, message: messages.notFound };
    }

    const user = rows[0];

    if(!hasCorrectPassword(password, user.password)) {
      throw { status: 401, message: messages.login };
    }

    const token = jwt.sign(
      { id: user.id },
      config.app.secret,
      { expiresInMinutes: ONE_WEEK, issuer: user.email }
    );

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email
      }
    };
  }
};

module.exports = Token;
