var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('visits', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    site_id: { type: 'int', notNull: true },
    ip_address: { type: 'string', notNull: false },
    user_agent: { type: 'string', notNull: false },
    created_at: { type: 'timestamp', notNull: true, defaultValue: new String('CURRENT_TIMESTAMP')}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('visits', true, callback);
};
