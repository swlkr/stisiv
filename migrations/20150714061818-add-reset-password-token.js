var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn("users", "reset_password_token", { type: "string" }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn("users", "reset_password_token", callback);
};
