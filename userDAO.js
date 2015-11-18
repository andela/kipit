// development dependencies
var app = require('express')();
var DA0 = require('../DOAfactory');
var db = require('../..database');

db.connect();

var UserDAO = DAO("UserDAO", client,
  (
    firstName TEXT(25) NOT NULL,
    lastName TEXT(25) NOT NULL,
    userName TEXT(15) NOT NULL,
    email varchar(30) PRIMARY KEY NOT NULL UNIQUE
  );
);
