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
        var data1 = {
            title: req.body.title,
            content: req.body.content,
            user_id: req.body.user_id,
        };
        Blog.create(data1, function (data) {
            console.log(data.errno);
            if (data.errno == 1048) {
                return res.status(480).send({ message: "Thieu truong", result: data.sqlMessage });
            }
            if (data.errno == 1452) {
                return res.status(452).send({ message: "User_id khong ton tai" });
            }
            res.send({ message: "Tao bai viet thanh cong", result: data });
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

        // const orders = await axios.get('http://192.168.1.9:80/magento2/rest/V1/orders?searchCriteria', config);

        // if (orders != null) {
        const data1 = req.body;
        if(req.body.img){
            const sourceFilePath = req.body.img;
            // const destFolderPath = 'G:\\xampp\\htdocs\\magento2\\pub\\media\\catalog\\blog';
            // const fileName = path.basename(sourceFilePath);

            console.log(sourceFilePath);

            // const destFilePath = path.join(destFolderPath, fileName);
            
            // fs.copyFileSync(sourceFilePath, destFilePath); // sao chép file từ nguồn đến đích        
            
            // data1.img = fileName;
        }else{
            data1.img = null;
        }

        Blog.update(data1, function (data) {
            console.log(data.affectedRows);
            if (data.affectedRows == 0) {
                return res.send({ message: "Tim khong thay bai viet" });
            } else res.send({ message: "Da cap nhap bai viet" });
        });
        // } else {
        //     return res.send({ message: "Token khong hop le" });
        // }


    } catch (error) {
        console.log(error);

        // if (error.response.status == 400) {
        //     return res.status(400).json({ message: "4000" });
        // }
        // if (error.response.status == 401) {
        //     return res.status(401).json({ message: "Token khong hop le" });
        // }
        // if (error.response.status == 403) {
        //     return res.status(403).json({ success: false, message: "430" });
        // }

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

