require("dotenv").load();

var config = {};

config.mailgun = {};
config.mailgun.apiKey = process.env.MAILGUN_API_KEY;
config.mailgun.domain = process.env.MAILGUN_DOMAIN || "sandboxc5bc765ef14841d3bdf61ff755c12bd5.mailgun.org";
config.mailgun.from = process.env.MAILGUN_FROM || "postmaster@sandboxc5bc765ef14841d3bdf61ff755c12bd5.mailgun.org";

config.db = {};
config.db.url = process.env.DATABASE_URL || "postgres://postgres:@localhost:5432/visics_development";

config.app = {};
config.app.port = process.env.PORT || 3000;
config.app.origin = process.env.ORIGIN || "http://localhost:8080";
config.app.secret = process.env.SECRET || "mJR2yr4ltzjeMEANoL9Ln2Hsgad//HuXxkpSnx/lVHg=";

module.exports = config;
