const db = require('../common/connect');

const Blog = function (Blog) {
    this.id = blog.id;
    this.title = blog.title;
    this.content = blog.content;
    this.user_id = blog.user_id;
    this.created_at = blog.created_at;

};

Blog.get_all_blog = function (result) {
    db.query("SELECT * FROM blog", function (err, blog) {
        if (err) {
            result(err);
        }
        else {
            result(blog);
        }
    });

};

Blog.get_blog_by_id = function (id, result) {
    db.query("SELECT * FROM blog WHERE blog_id = ?", [id], function (err, blog) {
        if (err) {
            result(err);
        }
        else {
            result(blog);
        }
    });

};

Blog.create = function (data, result) {

    console.log(data);

    db.query("INSERT INTO blog SET ?", data, function (err, blog) {
        if (err) {
            result(err);
        }
        else {
            result(blog);
        }
    });

};

Blog.update = function (data, result) {

    console.log(data);

    db.query("UPDATE blog SET img = ?,title = ?,content = ? WHERE blog_id = ?",
        [data.img, data.title, data.content, data.blog_id],
        function (err, blog) {
            if (err) {
                result(null);
            }
            else {
                result(blog);
            }
        }
    );

};

Blog.delete = function (data, result) {

    console.log(data);

    db.query("DELETE FROM blog WHERE blog_id = ?",
        data,
        function (err, blog) {
            if (err) {
                result(err);
            }
            else {
                result(blog);
            }
        }
    );

};


module.exports = Blog;