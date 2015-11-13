// require modules
var express = require("express");
var db = require("./database");
var daofactory = require("./../createDAO");
var app = express();

var client = db();

var Users = daofactory("Users", client, {
  "primaryKey ": "id",
  "table": "author"
});

Users.find({
  "where": {
    "eq": {
      "and": {
        "and": {
          "eq": {
            "id": ["90", "87"],
            "name": ["polik", "perl"]
          },
          "or": {
            "eq": {
              "id": ["102", "120"],
              "name": ["mokn", "unghg"]
            }
          }
        },
        "or": {
          "lt": {
            "id": "100"
          },
          "or": {
            "eq": {
              "id": ["345", "456"],
              "name": ["checj", "wetgg"]
            }
          }
        }
      },
      "or": {
        "and": {
          "eq": {
            "id": ["90", "87"],
            "name": ["polik", "perl"]
          },
          "or": {
            "eq": {
              "id": ["102", "120"],
              "name": ["mokn", "unghg"]
            }
          }
        },
        "or": {
          "lt": {
            "id": "100"
          },
          "or": {
            "eq": {
              "id": ["345", "456"],
              "name": ["checj", "wetgg"]
            }
          }
        }
      }
    }
  },
  "orderby": ["id"],
  "orderwith": "asc",
  "cols": ["name", "id"],
  "values": {
    "field": ["id", "name"],
    "value": ["54", "Ilias"]
  }
}, function(x) {
  console.log(x);
});

// app.get("/",function(req,res){
//   res.json("Send me");
// });

module.exports = app;