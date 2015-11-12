function createDAO(modelname, db, param) {

  // assign arguments to variables
  var modelname = modelname;
  var pKey = param.primaryKey;
  var table = param.table;
  var db = db;
  db.connect();

  var filters = ["and", "or", "eq", "ne", "gt", "gte", "lt", "lte", "like", "nlike", "in", "nin", "cts"];

  function createFilter(params, op) {
    var operands = {
        "and": "=",
        "or": "=",
        "eq": "=",
        "ne": "<>",
        "gt": ">",
        "gte": ">=",
        "lt": "<",
        "lte": "<=",
        "like": "%"
      },
      filterStr = "";
    for (var x in params) {
      if (typeof params[x] === 'object') {
        filterStr = params[x]
          .map(function(value) {
            return x + operands[op] + "'" + value.trim() + "'";
          })
          .join(" or ");
      } else {
        filterStr = x + operands[op] + "'" + params[x].trim() + "'";
      }
    }
    return filteStr;
  }

  /**
   * [parseParams concatenates conditions to sql syntax string for queries ]
   * @param  {[object]} params       [conatins conditions to be concatentated]
   * @param  {[array]} oldKey       [outer condition matcher]
   * @param  {[string]} newKey       [direct condition matcher]
   * @param  {[array]} filterString [array of conditions in sql syntax]
   * @return {[string]}              [string of conditions in sql syntax]
   */
  function parseParams(params, oldKey, newKey, filterString) {
      var oldKey = oldKey,
      cParams, filterString = filteString;
    for (var key in params) {
      if (filters.indexOf(key) > -1) {
        cParams = params[key];
        oldKey.push(newKey);
        newKey = key;
        parseParams(cParams, oldKey, newKey, filterString);
      } else {
        filterString.push(createFilter(params, newKey));
        break;
      }
    }
    return filterString.join(" " + oldKey[1] + " ");
  }

  /**
   * appends single quotes to values for insert
   * @param  {[object]} values [array of values to be modified]
   * @return {[array]}        [array of modified values]
   */
  function concat(values) {
    var val = values.map(function(x) {
      return "'" + x + "'";
    });
    return val;
  }
  /**
   * [concatValues generates sql syntax for inserting values]
   * @param  {[object]} params [object containing insert field and values]
   * @return {[array]}        [array of sql syntax for field and values]
   */
  function concatValues(params) {
    var fields = "",
      values,
      startValues = "",
      multiInsert = [],
      insertValue = [];
    fields = (typeof params.field === "object") ? params.field.join(", ") : params.field;
    startValues = params.value;

    startValues.forEach(function(val) {
      if (typeof val === 'object') {
        multiInsert.push("(" + concat(val).join(", ") + ")");
      } else {
        insertValue.push("'" + val + "'");
      }
    });
    values = (insertValue.length > 0) ? "(" + insertValue.join(", ") + ")" : multiInsert.join(", ");
    fields = "(" + fields + ")";
    return [fields, values];
  }

  /**
   * Generic find method for database query
   * @param  {[object]}   search [object containing parameters for query]
   * @param  {Function} cb     [callback to be exceuted on query results]
   * @return {[type]}          [matching rows in database]
   */
  function finds(search, cb) {
    var filter = (search.where) ? " where " + parseParams(search.where, [], "", []) : "";
    var cols = (search.cols) ? search.cols : "*";
    var order = (search.orderby && search.orderwith) ? " order by " + search.orderby.join(", ") + " " + search.orderwith : "";
    db.query("select " + cols + " from " + table + filter, function(err, data) {
      if (err) { return err; }
      cb(data.rows);
    });
  }

  // returns matching rows in database based on columns specified
  function _find(params, cb) {
    var search = params;
    search.cols = (typeof search.cols === 'object') ? search.cols.join(", ") : search.cols;
    finds(search, cb);
  }

  // returns matching rows in database and all columns
  function _findAll(params, cb) {
    var search = params;
    search.cols = undefined;
    finds(search, cb);
  }

  /**
   * Delete matching rows from the table
   * @param  {[object]}   params [object containing conditions]
   * @param  {Function} cb     [callback to be executed on the query results]
   * @return {[number]}          [count of rows deleted]
   */
  function _delete(params, cb) {
    var filter = (params.where) ? " where " + parseParams(params.where, [], "", []) : "";
    db.query("delete from " + table + filter, function(err, data) {
      if (err) return err;
      cb(data.rowCount);
    });
  }

  /**
   * Inserts values into table in the database
   * @param  {[object]}   params [object containing filed and values]
   * @param  {Function} cb     [callback to be executed on the query results]
   * @return {[number]}          [count of rows inserted]
   */
  function _insert(params, cb) {
    if (params.values) {
      var val = concatValues(params.values);
      db.query("insert into " + table + " " + val[0] + " values " + val[1], function(err, data) {
        if (err) {
          return err;
        }
        cb(data.rowCount);
      });
    } else {
      cb("Insert parameters incomplete");
    }
  }

  /**
   * updates values into table in the database
   * @param  {[object]}   params [object containing conditions and update value]
   * @param  {Function} cb     [callback to be executed on the query results]
   * @return {[number]}          [count of rows updated]
   */
  function _update(params, cb) {
    if (params.values && params.where) {
      var val = params.values.field.map(function(xfield, index) {
        return xfield + "= '" + params.values.value[index] + "'";
      });
      val = val.join(", ");
      var filter = (params.where) ? " where " + parseParams(params.where, [], "", []) : "";
      db.query("update " + table + " set " + val + filter, function(err, data) {
        if (err) {
          return err;
        }
        cb(data.rowCount);
      });
    } else {
      cb("Insert parameters incomplete");
    }
  }

  // return model methods
  return {
    find: _find,
    findAll: _findAll,
    delete: _delete,
    insert: _insert,
    update: _update
  };
}

module.exports = createDAO;