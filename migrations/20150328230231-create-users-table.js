var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: { type: 'string', unique: true, notNull: true },
    password: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP')}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', true, callback);
};
