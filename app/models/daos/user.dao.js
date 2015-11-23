// development dependencies
var DA0 = require('./dao-factory');
var db = require('../models/config/database');
var userParams = require('../schema/user.json');

var client = db();

var UserDAO = DAO("UserDAO", client, userParams);
