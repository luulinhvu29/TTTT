module.exports = function(router){
    var userController = require('../controllers/user.controller');

    router.get("/user/list", userController.get_user);

    router.get("/user/admin/list", userController.get_admin_user);

    router.get("/user/detail", userController.detailUser);

    router.get("/user/order", userController.orderUser);

    router.post('/user/add', userController.add_user);

    // router.delete('/book/delete/:id', bookController.remove_book);
    router.delete('/user/delete', userController.remove_user);

    router.patch('/user/update', userController.update_user);

};