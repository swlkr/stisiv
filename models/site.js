const config    = require("../config"),
      acid      = require("acidjs")(config.db.url),
      validator = require("validator");

const Site = acid.Model("sites");

const messages = {};
messages.invalid = {
  url: "Try entering a real url"
};
Site.messages = messages;

Site.define("isValid", function() {
  return this.hasValidUrl();
});

Site.define("hasValidUrl", function() {
  this.errors = [];
  if(!validator.isURL(this.url)) {
    this.errors.push(messages.invalid.url);
  }

  return this.errors.length === 0;
});

Site.create = function *(url, user) {
  // TODO: Find a better place for this?

  // Business logic to create a site:

  // 1. Check for a valid url
  // 2. Generate identifier
  // 2. Copy 1px image from filesystem
  // 3. Rename image to `${identifier}.jpg`
  // 4. Save new image with identifier name
  // 5. Save the site
  // 6. Return site

  var site = new Site({
    url: url,
    user_id: user.id,
    identifier: Math.random().toString(36).slice(2)
  });

  if(!site.isValid()) {
    throw ({message: site.errors.join(", "), status: 422});
  }

  // This might throw an error
  var savedSite = yield site.save();

  return {
    id: savedSite.id,
    url: savedSite.url,
    identifier: savedSite.identifier,
    visitCount: 0
  };
};

Site.list = function *(user_id) {
  return Site.where("user_id = ?", user_id).run();
};

module.exports = Site;
