module.exports = function(router){
    var categoryController = require('../controllers/category.controller');

    router.get("/category/list/", categoryController.get_cate);


};