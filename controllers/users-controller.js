const User = require("../models/user");

const UsersController = {
  routes: function() {
    return [
      { method: "post", url: "/users", fn: this.create, auth: false }
    ];
  },
  create: function *() {
    this.body = yield User.create(this.request.body.email, this.request.body.password);
  }
};

module.exports = UsersController;
