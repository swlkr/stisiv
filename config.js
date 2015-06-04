require("dotenv").load();

var config = {};

config.db = {};
config.db.url = process.env.DATABASE_URL || "postgres://postgres:@localhost:5432/visics_development";

config.app = {};
config.app.port = process.env.PORT || 3000;
config.app.origin = process.env.ORIGIN || "http://localhost:8080";
config.app.secret = process.env.SECRET || "mJR2yr4ltzjeMEANoL9Ln2Hsgad//HuXxkpSnx/lVHg=";

module.exports = config;
