module.exports = function(router){
    var orderController = require('../controllers/order.controller');

    router.get("/order/list/", orderController.get_order);

    router.get("/order/detail/:order_id", orderController.get_order_detail);


};