var db_config = require("./config");
describe("Database", function() {
    describe("Application", function() {
    	beforeEach(function(){
			var node_env = process.env.NODE_ENV;
		});

        it("should be connected to the correct database.", function() {
        	if (node_env === 'development'){
            	expect(db_config[node_env].database).toBe('');
        	} else if (node_env === 'test') {
        		expect(db_config[node_env].database).toBe('');
        	} else if (node_env === 'staging') {
        		expect(db_config[node_env].database).toBe('');
        	} else if (node_env === 'production') {
        		expect(db_config[node_env].database).toBe('');
        	}
        });
    });
});