module.exports = function(router){
    var productController = require('../controllers/product.controller');

    router.get("/product/list", productController.get_all_product);
    
    router.get("/product/list1", productController.get_all_producttt);

    router.get("/product/featured", productController.get_featured_product);

    router.get("/product/price", productController.get_product_by_price);

    router.get("/product/search/:search/:value", productController.get_product_filter);

    router.get("/product/list/name", productController.get_product_name);

    router.get("/product/related_product/:sku", productController.get_related_product);

    router.get("/product/detail/:sku", productController.get_detail_product);

    //router.get("/user/detail", userController.detailUser);


};