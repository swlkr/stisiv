const User      = require("./user"),
      jwt       = require("jsonwebtoken"),
      config    = require("../config"),
      ONE_WEEK  = 10080;

const messages = {
  missingParameters: "Come on! You can't just leave 'em blank!",
  notFound: "Terribly sorry but we couldn't find you"
};

const Token = {
  create: function *(email, password) {
    if(!email || !password) {
      throw { status: 401, message: messages.missingParameters };
    }

    const users = yield User.where("email = ?", email).run();

    if(users.length === 0) {
      throw { status: 404, message: messages.notFound };
    }

    var user = users[0];

    if(!user.hasCorrectPassword(password)) {
      throw { status: 401, message: user.errors.join(", ") };
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
