function createDAO(modelname, db, param) {

  // assign arguments to variables
  var modelname = modelname;
  var pkey = param.primaryKey;
  var table = param.table;
  var db = db;
  db.connect();
  // define methods for return model object
  function find(value, cb) {
    db.query("select * from " + table + " where " + pkey + " =" + value, function(err, data) {
      if (err) {
        return console.log(err);
      }
      cb(data.rows);
    });
  }

  function findAll(cb) {
    db.query("select * from " + table, function(err, data) {
      if (err) {
        return console.log(err);
      }
      cb(data.rows);
    });
  }

  // return model objects - methods
  return {
    find: function(value, cb) {
      return find(value, cb);
    },
    findAll: function(cb) {
      return findAll(cb);
    }
  };
};

module.exports = createDAO;