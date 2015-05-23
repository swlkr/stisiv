const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      validator = require("validator");

const messages = {};
messages.invalid = {
  url: "Try entering a real url"
};

const table = "sites";

var Site = {};

Site.create = function *(url, user) {
  if(!validator.isURL(url)) {
    throw ({ message: messages.invalid.url, status: 422 });
  }

  var data = {
    url: url,
    user_id: user.id,
    identifier: Math.random().toString(36).slice(2)
  };

  var rows = yield acid.insert(table, data);
  var site = rows[0];

  return {
    id: site.id,
    url: site.url,
    identifier: site.identifier,
    visitCount: 0
  };
};

Site.list = function *(user_id) {
  var sites = yield acid.sql("select * from sites_with_visit_count($1)", [user_id]);
  return sites;
};

module.exports = Site;
