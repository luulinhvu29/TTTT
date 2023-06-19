module.exports = function(router){

    var JWT = require('../common/_JWT');
    var userController = require('../controllers/user.controller');

    router.post('/account/add', userController.add_user);

    router.post('/account/login', userController.login);

    router.post('/account/admin/login', userController.admin_login);

    router.post('/account/register', userController.register);

    router.put('/account/update_address', userController.update_address);

    router.put('/account/change_password', userController.change_password);

};

