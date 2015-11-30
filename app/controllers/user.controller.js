var Users = require('../models/daos/user.dao');

// method to add new user
exports.createUser = function(req, res) {
  var params = {
    "values": {
      "field": ["userName", "email", "password"],
      "value": [req.body.userName, req.body.email, req.body.password]
    }
  };
  Users.insert(params, function(err, data) {
    console.log(params, err);
    if (err) throw err;
    res.json(data);
  });
};

// method to get a user
exports.getUser = function(req, res) {
  var params = {
    "where": {
      "eq": {
        "userName": req.params.userName
      }
    }
  };
  Users.findAll(params, function(err, data) {
    if (err) throw err;
    res.json(data.rows);
  });
};

// method to update user
exports.updateUser = function(req, res) {
  var params = {
    "where": {
      "eq": {
        "userName": req.params.userName
      }
    },
    "values": {
      "field": ["userName", "email", "password"],
      "value": [req.body.userName, req.body.email, req.body.password]
    }
  };
  Users.update(params, function(err, data) {
    if (err) throw err;
    res.json(data);
  });
};

// method to delete user
exports.deleteUser = function(req, res) {
  var params = {
    "where": {
      "eq": {
        "userName": req.params.userName
      }
    }
  };
  if (req.params.userName) {
    Users.delete(params, function(err, data) {
      if (err) throw err;
      res.json({data: "deleted successfully"});
    });
  }
};
