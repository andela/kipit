// definition of config object for postgres database
config = {
	development :{
	  host: 'localhost',
	  user: 'user',
	  password: 'password',
	  database: 'kipit',
	  port :5432
	},
// staging config object
	staging:{
		host: 'localhost',
	  user: 'ubuntu',
	  password: 'dumbledore',
	  database: 'circle_test',
	  port :5432
	}
};
module.exports = config;