const Site = require("../models/site");

const SitesController = {
  routes: function() {
    return [
      { method: "post", url: "/sites", fn: this.create, auth: true }
    ];
  },
  create: function *() {
    this.body = yield Site.create(this.request.body.url, this.user);
  }
};

module.exports = SitesController;
