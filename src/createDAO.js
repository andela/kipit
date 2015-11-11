function createDAO(modelname, db, param) {

  // assign arguments to variables
  var modelname = modelname;
  var pparams = param.primaryparams;
  var table = param.table;
  var db = db;
  db.connect();

 function createfilter(params, method) {
    var filter = "";
    for (var x in params) {
      filter = (filter === "") ? filter : filter + method;
      filter += x + "=" + ((typeof params[x] === 'number') ? params[x] : "'" + params[x] + "'");
    }
    return filter;
  }

  function concatvalues(params) {
    var fields = "",
      values = "";
    for (var x in params) {
      fields += ((fields === "") ? "" : ",") + x;
      values = (values === "") ? values : values + ",";
      values += ((typeof params[x] === 'number') ? params[x] : "'" + params[x] + "'");
    }
    fields = "(" + fields + ")";
    values = "(" + values + ")";
    return [fields, values];
  }

  // define methods for return model object
  /**
   * Queries the database for results matching a single params : value pair
   * @param  {Function} cb    query results are passed to callback function 
   * @return {json} json formatted data 
   */
  function finds(search, method, cb) {
    var filter = createfilter(search.params, method);
    db.query("select * from " + table + " where " + filter, function(err, data) {
      if (err) return err;
      cb(data.rows);
    });
  }

  function _find(search, cb) {
    finds(search, " and ", cb);
  }

  function _findAll(search, cb) {
    finds(search, " or ", cb);
  }

  function _delete(search, cb) {
    var filter = createfilter(search.params, " and ");
    db.query("delete from " + table + " where " + filter, function(err, data) {
      if (err) return err;
      return data;
    });
  }

  function _insert(values, cb){
    var val = concatvalues(values.params);
    db.query("insert into " + table + " " + val[0] + " " + val[1], function (err, data) {
      if (err) { return err; }
      cb(data.rowCount);
    });
}

function _update(vals, cb){
  var values  = createfilter(vals.values, ", ");
  var filter = createfilter(vals.params, " and ");
  db.query("update "+ table + " set " + values + " where " + filter ,   function (err, data) {
      if (err) { return err; }
      cb(data.rowCount);
    }); 
}
  // return model methods
  return {
    find: _find,
    findAll: _findAll,
    _delete: _delete,
    insert : _insert,
    update : _update
  }
};

module.exports = createDAO;