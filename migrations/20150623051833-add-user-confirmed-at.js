var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn("users", "confirmed_at", { type: "timestamp" }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn("users", "confirmed_at", callback);
};
