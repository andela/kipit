var _ = require("lodash");
var async = require("async");

function createDAO(modelname, db, param) {

  // assign arguments to variables
  var modelname = modelname;
  var tableName = param.table || modelname;
  var db = db;

  // parses Table data and constraints
  function parseTableSql(params) {
    var tableConstraints = params.constraints;
    var tableForeignKey = params.foreignKey;
    var tabledata = [];
    // check for foreign key tabledefinition
    if (tableForeignKey) {
      var arr = (tableForeignKey.cols === "object")? tableForeignKey.cols.join(", ") : tableForeignKey.cols;
      tabledata.push("FOREIGN KEY (" + arr + ") REFERENCES " + tableForeignKey.refs);
    }
    // check for constraints
    if (tableConstraints) {
      // checck for CHECK constraints
      if (tableConstraints.check) {
        var temp = tableConstraints.check.map(function(x) {
          var name = (x.id) ? x.id : "";
          var keyWord = (name !== "") ? "CONSTRAINT " + name : "";
          return keyWord + " CHECK (" + x.colref + ")";
        });
        tabledata.push(temp.join(", "));
      }
      // check for UNIQUE constraints
      if (tableConstraints.unique) {
        var name = (tableConstraints.unique.id) ? tableConstraints.unique.id : "";
        var keyWord = (name !== "") ? "CONSTRAINT " + name : "";
        if (typeof tableConstraints.unique.colref === "object") {
          tabledata.push(keyWord + " UNIQUE (" + tableConstraints.unique.colref.join(", ") + ")");
        } else {
          tabledata.push(keyWord + " UNIQUE (" + tableConstraints.unique.colref + ")");
        }
      }
    }
    return tabledata.join(", ");
  }

  // defines attribute to be checked in column definition
  var columndata = ["type", "defaultval", "constraints", "references"];
  /**
   * Parses column definition in object
   * @param  {string} colname column name
   * @param  {object} columns object containing column attributes
   * @return {string}         sql syntax column definition
   */
  function parseColumnSql(colname, columns) {
    var colSyntax = [];

    colSyntax.push(colname);

    _.forEach(columndata, function(coldata) {
      if (columns.hasOwnProperty(coldata)) {

        // checks for column attributes
        switch (coldata) {
          case "type":
            colSyntax.push(columns[coldata]);
            break;
          case "defaultval":
            colSyntax.push("DEFAULT " + columns[coldata]);
            break;
          case "constraints":
            if (columns.constraints.allowNull) {
              colSyntax.push("NOT NULL");
            }
            if (columns.constraints.primaryKey) {
              colSyntax.push("PRIMARY KEY");
            }
            if (columns.constraints.unique) {
              var name = (columns.constraints.unique.id) ? columns.constraints.unique.id : "";
              var keyWord = (name !== "") ? "CONSTRAINT " + name : "";
              colSyntax.push(keyWord + " UNIQUE");
            }
            if (columns.constraints.check) {
              var name = (columns.constraints.check.id) ? columns.constraints.check.id : "";
              var keyWord = (name !== "") ? "CONSTRAINT " + name : "";
              colSyntax.push(keyWord + " CHECK (" + columns.constraints.check.colref + ")");
            }
            break;
          case "references":
            colSyntax.push("REFERENCES " + columns[coldata]["refs"]);
            break;
          default:
            break;
        }
      }
    });
    return colSyntax.join(" ");
  }

  /**
   * Creates model/Table from supplied parameters in daofactory
   * @param  {object} params object defining table schema
   * @return {string}        Query results
   */
  function _createTable(params) {
    var pKey = params.primaryKey,
      dropCreate = "",
      checkCreate = "";

    if (params.forcecreate) {
      dropCreate = "DROP TABLE IF EXISTS ";
    } else {
      checkCreate = "IF NOT EXISTS ";
    }

    var columns = params.columns,
      createCol = [];
    _.forOwn(columns, function(cols, key) {
      createCol.push(parseColumnSql(key, cols));
    });
    createCol = createCol.join(", ");

    var sqlCreateTable = "CREATE TABLE " + checkCreate + tableName + " ( " + createCol + ", " + parseTableSql(param) + " )";
    var sqlDropTable = dropCreate + tableName;

    if (dropCreate !== "") {
      executeQueryStmt(sqlDropTable, function(data) {
          if (data.command) {
              console.log(tableName, " Dropped");
              executeQueryStmt(sqlCreateTable, console.log);
            } else {
              console.log("Error occured with DROP ", tableName);
              return data;
            }
      });
    } else {
      executeQueryStmt(sqlCreateTable, console.log);
    }
  }

  // operand for query
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
   * appends single quotes to values for insert;  or values for filters
   * @param  {array} valueArr array of values to be modified
   * @param  {string} field   key to be paired - Optional
   * @param {string} op Condition for field:value pair - Optional
   * @return {array}        array of strings of modified values
   *
   * Example 1: 
   * when op is defined, call to appendSingleQuotes in "createFilter"
   * 
   * args0 = [value1, value2, value3], args1 = "name", args3 = "eq" 
   * "eq" is replaced with "="  i.e. operands["eq"]
   * result =  [name = 'value1',name = 'value2',name = 'value3']
   * 
   * args0 = [value1, value2, value3], args1 = "id", args3 = "lt" 
   * "lt" is replaced with "<" i.e. operands["lt"]   
   * result =  [id = 'value1', id = 'value2', id = 'value3']
   *
   * Example 2: 
   * when op and field is null, call to appendSingleQuotes in "genSqlFieldValue"
   * 
   * args = [value1, value2, value3]
   * result =  ['value1', 'value2', 'value3']
   */
  function appendSingleQuotes(valueArr, field, op) {
    var val;
    if (op === "" || field === "") { // call in genSqlFieldValue
      val = valueArr.map(function(value) {
        return "'" + value.trim() + "'";
      });
    } else { // call in createFilter
      val = valueArr.map(function(value) {
        return field + operands[op] + "'" + value.trim() + "'";
      });
    }
    return val;
  }

  /**
   * genSqlFieldValue generates sql syntax for inserting values
   * @param  {key-pair} params keypair containing insert field and values
   * @return {array}        array of strings of sql syntax for field and values
   *
   * Example :
   * single insert
   * args : "values": { "field": ["id", "name"], "value": ["54", "Ilias"] }
   * result =  [ "(id, name)", ('54', 'Ilias') ] 
   *
   * batch insertion
   * args : "values": { "field": ["id", "name"], "value": [["54", "Ilias"], ["65", "Pollock"]] }
   * result = [ "(id, name)", "('54', 'Ilias'), ('65', 'Pollock')" ]

    })
   */
  function genSqlFieldValue(params) {
    var fields = "",
      values,
      startValues = "",
      multiInsert = [],
      insertValue = [];

    // appends brackets to field
    if (typeof params.field === "object") { //join array values and append bracket
      fields = "(" + params.field.join(", ") + ")";
    } else {
      fields = "(" + params.field + ")";
    }

    startValues = params.value; // assign insert values to variable

    // append single quotes
    startValues.forEach(function(val) {
      if (typeof val === 'object') { // append single quotes and brackets
        multiInsert.push("(" + appendSingleQuotes(val).join(", ") + ")");
      } else { // append single quotes
        insertValue.push("'" + val.trim() + "'");
      }
    });

    // checks for multiple insertion
    if (insertValue.length > 0) {
      values = "(" + insertValue.join(", ") + ")"
    } else {
      values = multiInsert.join(", ");
    }

    return [fields, values];
  }

  /**
   * creates an sql conditional syntax
   * @param  {object} params contains conditions to be concatenated
   * @param  {string} op     operand to use for conditions
   * @param  {string} ops    operand for multi conditions
   * @return {string}        sql condition syntax
   *
   * Example :
   * args0 = { "id": ["2", "6"], "name": ["Isaac", "jackiy"] }, args1 = "and"
   * result = 
   * 
   */
  function createFilter(params, op) {
    var filterStr = [];
    for (var x in params) {
      if (typeof params[x] === "object") {
        filterStr.push(appendSingleQuotes(params[x], x, op).join(" or "));
      } else {
        filterStr.push(x + operands[op] + "'" + params[x].trim() + "'");
      }
    }
    return filterStr.join(" and ");
  }

  /**
   * parseParams concatenates conditions to sql syntax string for queries
   * @param  {object} params      contains conditions (search.where) to be concatentated
   * @return {string}  filterString         string of conditions in sql syntax
   *
   * see core.dao.spec.js for example on params args for parseParams
   */
  function parseParams(params) {
    var filterString = [],
      op,
      temp = [];
    // for each operands specified in where
    _.forOwn(params, function(value, key) {
      if (operands.hasOwnProperty(key)) {
        // operands is not nested with another operand
        if (value.length === undefined) {
          filterString.push("(" + createFilter(value, key) + ")");
        }
        // Operand is nested in an array of operands
        else {
          // loop through operands in array
          _.forEach(value,
            function(n) {
              _.forEach(n, function(_value, _key) {
                temp.push(createFilter(_value, _key));
              });
            });
          // join results with outer operands
          filterString.push("(" + temp.join(" " + key + " ") + ")");
        }
      }
    });
    op = " " + (params["operator"]) + " " || " and ";
    return filterString.join(op);
  }


  /**
   * creates a database connection and query
   * @param  {string} stmt sql query statement
   * @return {json data}      query results
   */
  function executeQueryStmt(stmt, cb) {
    // check if databse connection is open
    if (!db.connection.stream.readable) {
      db.connect(function(err, db) {
        if (err) {
          cb("Could not connect to postgres \n" + err);
        } else {
          console.log("Connection established");
        }
      });
    }
    // execute Query
    db.query(stmt, function(err, data) {
      if (err) {
        cb(err);
        db.end();
      } else {
        cb(data);
        db.end();
      }
    });
  }

  /**
   * Generic find method for database query
   * @param  {object}   search object containing parameters for query
   * @param  {Function} cb     callback to be exceuted on query results
   * @return {json data}          matching rows in database
   */
  function finds(search, cb) {
    var order = "";
    var filter = " where " + parseParams(search.where) || "";
    var cols = search.cols || "*";
    if (search.orderby && search.orderwith) {
      order = " order by " + search.orderby.join(", ") + " " + search.orderwith;
    }

    var stmt = "select " + cols + " from " + tableName + filter + order;
    executeQueryStmt(stmt, cb);
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
    var filter = " where " + parseParams(params.where) || "";
    var stmt = "delete from " + tableName + filter;
    executeQueryStmt(stmt, cb);
  }

  /**
   * Inserts values into table in the database
   * @param  {[object]}   params [object containing filed and values]
   * @param  {Function} cb     [callback to be executed on the query results]
   * @return {[number]}          [count of rows inserted]
   */
  function _insert(params, cb) {
    if (params.values) {
      var val = genSqlFieldValue(params.values);
      var stmt = "insert into " + tableName + " " + val[0] + " values " + val[1];
      executeQueryStmt(stmt, cb);
    } else {
      cb(JSON.stringify({
        "error": "Insert parameters incomplete"
      }));
    }
  }

  /**
   * updates values into table in the database
   * @param  {[object]}   params [object containing conditions and update value]
   * @param  {Function} cb     [callback to be executed on the query results]
   * @return {[number]}          [count of rows updated]
   */
  function _update(params, cb) {
    var val, stmt;
    if (params.values && params.where) {
      // match field and value for update
      val = params.values.field.map(function(xfield, index) {
        return xfield + " = '" + params.values.value[index] + "'";
      });
      val = val.join(", ");
      var filter = " where " + parseParams(params.where) || "";

      stmt = "update " + tableName + " set " + val + filter;
      executeQueryStmt(stmt, cb);
    } else {
      cb(JSON.stringify({
        "error": "Update parameters incomplete"
      }));
    }
  }

  // create table if not exists
  _createTable(param);

  // return model methods
  return {
    find: _find,
    delete: _delete,
    findAll: _findAll,
    insert: _insert,
    update: _update
  };
}

module.exports = createDAO;