var userRoute = require('../routes/user.route');

var defineRoute = function(router) {
  userRoute(router);
};

module.exports = defineRoute;
