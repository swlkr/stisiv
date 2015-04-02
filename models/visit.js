const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      Site      = require("./site");

const Visit = acid.Model("visits");

Visit.create = function *(identifier, request) {

  var sites = yield Site.where("identifier = ?", identifier).run();
  var site = sites[0];

  var visit = new Visit({
    site_id: site.id,
    ip_address: request.ip,
    user_agent: request.headers["user-agent"]
  });

  // This might throw an error
  return yield visit.save();
};

module.exports = Visit;
