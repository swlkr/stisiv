const User = require("../models/user");

const UsersController = {
  routes: function() {
    return [
      { method: "post", url: "/users", fn: this.create, auth: false },
      { method: "put", url: "/users/:token/confirm", fn: this.confirm, auth: false },
      { method: "put", url: "/users/:id", fn: this.update, auth: true }
    ];
  },

  create: function *() {
    this.body = yield User.create(this.request.body.email, this.request.body.password);
  },

  confirm: function *(token) {
    this.body = yield User.confirm(token);
  },

  update: function *() {
    this.body = yield User.update(this.user.id, this.request.body);
  }
};

module.exports = UsersController;
