const User = require("../models/user");

const UsersController = {
  routes: function() {
    return [
      { method: "post", url: "/users", fn: this.create, auth: false },
      { method: "put", url: "/users/:token/confirm", fn: this.confirm, auth: false },
      { method: "put", url: "/users/:id", fn: this.update, auth: true },
      { method: "put", url: "/users/forgot-password", fn: this.forgotPassword, auth: false },
      { method: "put", url: "/users/reset-password/:token", fn: this.resetPassword, auth: false }
    ];
  },

  create: function *() {
    this.body = yield User.create(this.request.body.email, this.request.body.password);
  },

  confirm: function *(token) {
    this.body = yield User.confirm(token);
  },

  update: function *() {
    this.body = yield User.update(this.state.user.id, this.request.body);
  },

  forgotPassword: function *() {
    this.body = yield User.forgotPassword(this.request.body.email);
  },

  resetPassword: function *(token) {
    this.body = yield User.resetPassword(this.request.body, token);
  }
};

module.exports = UsersController;
