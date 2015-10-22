// definition of config object for postgres database
var config = {
	development :{
	  host: 'localhost',
	  user: 'ubuntu',
	  password: '',
	  database: 'kipit',
	  port :5432
	},
// test config object
	test:{
		host: 'localhost',
	  user: 'ubuntu',
	  password: '',
	  database: 'circle_test',
	  port :5432
	}
};
module.exports = config;
