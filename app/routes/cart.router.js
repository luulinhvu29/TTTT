module.exports = function(router){
    var cartController = require('../controllers/cart.controller');

    router.get("/cart/list", cartController.get_cart);

    router.post("/cart/add", cartController.add_to_cart);

    router.put("/cart/change", cartController.change_qty);

    router.delete("/cart/delete/:item_id", cartController.delete_cart);

    router.delete("/cart/delete_all", cartController.delete_all_cart);

    router.get("/cart/mine", cartController.cart_info);

    router.post("/cart/set_shipping_address", cartController.set_shipping_address );

    router.post("/cart/check_out", cartController.check_out_cart); 

};