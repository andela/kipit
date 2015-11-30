var userController = require('../controllers/user.controller');

module.exports = function(router) {
  router.route('/users/')
    .post(userController.createUser);
  router.route('/users/:userName')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
};
