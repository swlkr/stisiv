var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn("users", "confirmation_token", { type: "string" }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn("users", "confirmation_token", callback);
};
