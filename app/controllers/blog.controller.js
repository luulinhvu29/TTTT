var Blog = require('../models/blog.model');
var axios = require('axios');

const fs = require('fs');
const path = require('path');

exports.get_all_blog = function (req, res) {
    Blog.get_all_blog(function (data) {
        res.send({ result: data });
    });
};

exports.get_blog_by_id = function (req, res) {
    var id = req.params.id;
    Blog.get_blog_by_id(id, function (data) {
        if (!data[0]) {
            return res.send({ message: "Khong tim thay thay blog co id = " + id });
        }
        res.send({ result: data });
    });
};

exports.create_blog = async function (req, res) {
    const authHeader = req.header('Authorization');

    console.log(authHeader);
    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        // const orders = await axios.get('http://192.168.1.9:80/magento2/rest/V1/orders?searchCriteria', config);

        // if (orders != null) {
        

        let blog = req.body;

        if (req.file) {
            blog.img = req.file.filename;
        } else {
            blog.img = null;
        }

        Blog.create(blog, function (data) {
            console.log('blog', data);
            if (data.errno == 1048) {
                return res.status(480).send({ message: "Thieu truong", result: data.sqlMessage });
            }
            if (data.errno == 1452) {
                return res.status(452).send({ message: "User_id khong ton tai" });
            }
            return res.status(201).json({ message: "Tao bai viet thanh cong", result: data });
        });
        // } else {
        //     return res.send({ message: "Token khong hop le" });
        // }


    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 400) {
            return res.status(400).json({ message: "4000" });
        }
        if (error.response.status == 401) {
            return res.status(401).json({ message: "Token khong hop le" });
        }
        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "430" });
        }

    }

};

exports.update_blog = async function (req, res) {
    const authHeader = req.header('Authorization');

    console.log(authHeader);
    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };


        let blog = req.body;

        if (req.file) {
            blog.img = req.file.filename;
        } else {
            blog.img = null;
        }

        Blog.update(blog, function (data) {

            if (data.affectedRows == 0) {
                return res.status(404).json({ message: "Tim khong thay bai viet" });
            }
            Blog.get_blog_by_id(blog.blog_id, function (data) {
 
                if (!data[0]) {
                    return res.status(404).json({ message: "Khong tim thay thay blog co id = " + id });
                }
                return res.status(201).json({
                    message: "Cap nhat bai viet thanh cong",
                    blog: data[0]
                });
            });
        });
    } catch (error) {
        console.log(error);

        if (error.response.status == 400) {
            return res.status(400).json({ message: "4000" });
        }
        if (error.response.status == 401) {
            return res.status(401).json({ message: "Token khong hop le" });
        }
        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "430" });
        }

    }

};


exports.delete_blog = async function (req, res) {
    const authHeader = req.header('Authorization');

    console.log(authHeader);
    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        // const orders = await axios.get('http://192.168.1.9:80/magento2/rest/V1/orders?searchCriteria', config);

        // if (orders != null) {
        const data1 = req.params.blog_id;
        Blog.delete(data1, function (data) {
            console.log(data);
            if (data.affectedRows == 0) {
                return res.send({ message: "Tim khong thay bai viet" });
            } else res.send({ message: "Da xoa bai viet" });
        });
        // } else {
        //     return res.send({ message: "Token khong hop le" });
        // }


    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 400) {
            return res.status(400).json({ message: "4000" });
        }
        if (error.response.status == 401) {
            return res.status(401).json({ message: "Token khong hop le" });
        }
        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "430" });
        }

    }

};

