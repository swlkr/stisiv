const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      validator = require("validator"),
      tables    = require("./tables");

const FREE_TRIAL_SITES = 1;

const messages = {
  invalid: {
    url: "Try entering a real url"
  },
  business: {
    trialLimitReached: "Sorry but you can only create one site while on a free trial"
  }
};

var Site = {};

Site.count = function *(userId) {
  var rows = yield acid.where(tables.sites, "user_id = $1", userId);
  return rows.length;
};

Site.create = function *(url, user) {
  // Business logic alert
  // Move this somewhere more business logic-y?
  var sites = yield Site.count(user.id);
  if(sites >= FREE_TRIAL_SITES) {
    throw ({ message: messages.business.trialLimitReached, status: 422 });
  }

  if(!validator.isURL(url)) {
    throw ({ message: messages.invalid.url, status: 422 });
  }

  var data = {
    url: url,
    user_id: user.id,
    identifier: Math.random().toString(36).slice(2)
  };

  var rows = yield acid.insert(tables.sites, data);
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

Site.graphData = function *(id, user) {
  var coercedId = parseInt(id, 10);

  var rows = yield acid.sql("select * from site_graph_data($1, $2)", [coercedId, user.id]);

  var labels = rows.map(function(r) { return r.day; });
  var data = rows.map(function(r) { return parseInt(r.visits, 10); });

  return {
    labels: labels,
    datasets: [
        {
            label: "Visits in the last 30 days",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: data
        }
    ]
  };
};

module.exports = Site;
