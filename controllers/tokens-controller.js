const Token = require("../models/token");

const TokensController = {
  routes: function() {
    return [
      { method: "post", url: "/tokens", fn: this.create, auth: false }
    ];
  },
  create: function *() {
    this.body = yield Token.create(this.request.body.email, this.request.body.password);
  }
};

module.exports = TokensController;
