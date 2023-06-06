module.exports = function(router){
    var blogController = require('../controllers/blog.controller');

    router.get("/blog/list", blogController.get_all_blog);

    router.get("/blog/detail/:id", blogController.get_blog_by_id);

    router.post("/blog/create", blogController.create_blog);

    router.put("/blog/update", blogController.update_blog);

    router.delete("/blog/delete/:blog_id", blogController.delete_blog);


};