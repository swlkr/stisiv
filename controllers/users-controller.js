const User = require("../models/user");

const UsersController = {
  routes: function() {
    return [
      { method: "post", url: "/users", fn: this.create, auth: false },
      { method: "get", url: "/users/:token/confirm", fn: this.confirm, auth: false }
    ];
  },
  create: function *() {
    this.body = yield User.create(this.request.body.email, this.request.body.password);
  },
  confirm: function *(token) {
    this.body = yield User.confirm(token);
  }
};

module.exports = UsersController;
