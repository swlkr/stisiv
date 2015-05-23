const config = require("../config"),
      acid   = require("acidjs")(config.db.url);

const table = {
  visits: "visits",
  sites: "sites"
};

const Visit = {};

Visit.create = function *(identifier, request) {

  var rows = yield acid.where(table.sites, "identifier = $1", identifier);
  var site = rows[0];

  var data = {
    site_id: site.id,
    ip_address: request.ip,
    user_agent: request.headers["user-agent"]
  };

  // This might throw an error
  return yield acid.insert(table.visits, data);
};

module.exports = Visit;
