function createDAO(modelname, db, param) {

  // assign arguments to variables
  var modelname = modelname;
  var pKey = param.primaryKey;
  var table = param.table;
  var db = db;

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
  };



  /**
   * appends single quotes to values for insert
   * @param  {array} conditions array of values to be modified
   * @param {string} op Condition for field:value pair
   * @return {array}        array of modified values
   */
  function concatConditions(conditions, field, op) {
    var val;
    if (op == "") {
      val = conditions.map(function(cond) {
        return "'" + cond.trim() + "'";
      });
    } else {
      val = conditions.map(function(cond) {
        return field + operands[op] + "'" + cond.trim() + "'";
      });
    }
    return val;
  }

  /**
   * concatValues generates sql syntax for inserting values
   * @param  {object} params object containing insert field and values
   * @return {array}        array of sql syntax for field and values
   */
  function concatValues(params) {
    var fields = "",
      values,
      startValues = "",
      multiInsert = [],
      insertValue = [];

    if (typeof params.field === "object") {
      fields = params.field.join(", ")
    } else {
      fields = params.field;
    }
    startValues = params.value;

    startValues.forEach(function(val) {
      if (typeof val === 'object') {
        multiInsert.push("(" + concatConditions(val).join(", ") + ")");
      } else {
        insertValue.push("'" + val.trim() + "'");
      }
    });

    if (insertValue.length > 0) {
      values = "(" + insertValue.join(", ") + ")"
    } else {
      values = multiInsert.join(", ");
    }

    fields = "(" + fields + ")";
    return [fields, values];
  }

  /**
   * creates an sql conditional syntax
   * @param  {object} params contains conditions to be concatenated
   * @param  {string} op     operand to use for conditions
   * @param  {string} ops    operand for multi conditions
   * @return {string}        sql condition syntax
   */
  function createFilter(params, op, ops) {
    var filterStr = [];
    for (var x in params) {
      if (typeof params[x] === "object") {
        filterStr.push(concatConditions(params[x], x, op).join(" or "));
      } else {
        filterStr.push(x + operands[op] + "'" + params[x].trim() + "'");
      }
    }
    return filterStr.join(" " + ops + " ");
  }

  /**
   * parseParams concatenates conditions to sql syntax string for queries
   * @param  {object} params       contains conditions to be concatentated
   * @param  {array} oldKey       outer condition matcher
   * @param  {string} newKey       direct condition matcher
   * @param  {array} filterString array of conditions in sql syntax
   * @return {string}              string of conditions in sql syntax
   */
  function parseParams(params, oldKey, nkey, filterString) {
    var cParams;
    for (var key in params) {
      if (operands.hasOwnProperty(key)) {
        cParams = params[key];
        oldKey = nkey;
        nkey = key;
        parseParams(cParams, oldKey, nkey, filterString);
      } else {
        filterString.push(createFilter(params, nkey, oldKey));
        break;
      }
    }
    return filterString.join(" " + oldKey + " ");
  }

  /**
   * creates a database connection and query
   * @param  {string} stmt sql query statement
   * @return {json data}      query results
   */
  function db_access(stmt, cb) {
    db.connect();
    db.query(stmt, function(err, data) {
      if (err) {
        cb(err);
      }
      cb(data);
    });
  }

  /**
   * Generic find method for database query
   * @param  {object}   search object containing parameters for query
   * @param  {Function} cb     callback to be exceuted on query results
   * @return {json data}          matching rows in database
   */
  function finds(search, cb) {
    var filter = "",
      cols = "*",
      order = "";
    if (search.where) filter = " where " + parseParams(search.where, "", "", []);
    if (search.cols) cols = search.cols;
    if (search.orderby && search.orderwith) {
      order = " order by " + search.orderby.join(", ") + " " + search.orderwith;
    }

    var stmt = "select " + cols + " from " + table + filter + order;
    db_access(stmt, cb);
  }

  // returns matching rows in database based on columns specified
  function _find(params, cb) {
    var search = params;
    if (typeof search.cols === "object") search.cols = search.cols.join(", ");

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
    var filter = "";
    if (params.where) filter = " where " + parseParams(params.where, "", "", []);
    var stmt = "delete from " + table + filter;
    db_access(stmt, cb);
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
      var stmt = "insert into " + table + " " + val[0] + " values " + val[1];
      db_access(stmt, cb);
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
    var filter = "",
      val, stmt;
    if (params.values && params.where) {
      val = params.values.field.map(function(xfield, index) {
        return xfield + " = '" + params.values.value[index] + "'";
      });
      val = val.join(", ");
      if (params.where) filter = " where " + parseParams(params.where, "", "", []);

      stmt = "update " + table + " set " + val + filter;
      db_access(stmt, cb);
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