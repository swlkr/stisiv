var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('sites', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    user_id: { type: 'int', notNull: true },
    identifier: { type: 'string', unique: true, notNull: true },
    url: { type: 'string', notNull: true },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP')}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('sites', true, callback);
};
