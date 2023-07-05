var User = require('../models/user.model');
var JWT = require('../common/_JWT');
var axios = require('axios');

var BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

exports.get_user = function (req, res) {
    User.get_all(function (data) {
        res.send({ result: data });
    });
};

exports.detailUser = function (req, res) {
    User.getById(req.body.id, function (respnse) {
        res.send({ result: respnse });
    });
};

exports.orderUser = function (req, res) {
    User.getOrderByUserId(req.body.id, function (respnse) {
        res.send({ result: respnse });
    });
};

exports.add_user = function (req, res) {
    var data = req.body;
    User.create(data, function (respnse) {
        res.send({ result: respnse });
    });
};

exports.remove_user = function (req, res) {
    var id = req.body.id;
    User.remove(id, function (respnse) {
        res.send({ result: respnse });
    });
};

exports.update_address = async (req, res) => {
    const authHeader = req.header('Authorization');

    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {

        const data = {
            customer: {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                addresses: [{
                    defaultShipping: req.body.defaultShipping,
                    defaultBilling: req.body.defaultBilling,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    region: {
                        regionCode: req.body.regionCode,
                        region: req.body.region,
                        regionId: req.body.regionId
                    },
                    postcode: req.body.postcode,
                    street: [req.body.street],
                    city: req.body.city,
                    telephone: req.body.telephone,
                    countryId: req.body.countryId
                }]
            }
        };


        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        const customer_info = await axios.put(`${BaseURL}`+'/customers/me', data, config);

        return res.status(200).json({
            customer_info: customer_info.data
        });
    } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data);
        if (err.response.status == 400) {
            return res.status(400).json({
                message: "Thieu truong"
            });
        }
    }
}

exports.login = async (req, res) => {
    const data = {
        username: req.body.email,
        password: req.body.password,
    };

    try {

        const response = await axios.post(`${BaseURL}`+'/integration/customer/token', data);

        const config = {
            headers: {
                'Authorization': `Bearer ${response.data}`
            }
        };

        const customer_info = await axios.get(`${BaseURL}`+'/customers/me', config);

        return res.status(200).json({
            token: response.data,
            customer_info: customer_info.data
        });
    } catch (err) {
        console.log(err);
        // if (err.response.status == 401) {
        //     User.getByEmail(data.username, function (cusss) {
        //         console.log(cusss[0]);
        //         if (cusss[0] && cusss[0].confirmation != null) {
        //             return res.status(402).json({
        //                 message: "Tài khoản chưa xác thực"
        //             });
        //         } else return res.status(401).json({
        //             message: "Tài khoản hoặc mật khẩu không đúng"
        //         });
        //     });
        // }

    }
}

exports.register = async (req, res) => {
    try {
        const data = {
            customer: {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            },
            password: req.body.password
        };

        const response = await axios.post(`${BaseURL}`+'/customers', data);

        return res.status(201).json({
            message: "đã đăng ký thành công, vui lòng đăng nhập để bắt đầu.",
            customer_info: response.data
        });
    } catch (err) {
        console.log(err.response)
        if (err.response.status == 400) return res.status(400).json({
            message: 'Tài khoản đã tồn tại, xin đăng ký tài khoản khác'
        });

        if (err.response.status == 401) return res.status(401).json({
            message: 'Tài khoản hoặc mật khẩu không hợp lệ'
        });
    }
};

exports.change_password = async (req, res) => {
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

        const data = {
            email: req.body.email,
            template: "email_reset",
            currentPassword: req.body.old_password,
            newPassword: req.body.new_password,
        }

        const response = await axios.put(`${BaseURL}`+'/customers/me/password', data, config);

        return res.status(200).json({
            status: response.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);

        if (error.response.status == 400) {
            return res.status(400).json({ message: "???" });
        }
        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "internal server error" });
        }

    }
};

exports.get_admin_user = function (req, res) {
    User.get_admin_user(function (data) {
        res.send({ result: data });
    });
};

exports.admin_login = async (req, res) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };

    try {

        const response = await axios.post(`${BaseURL}`+'/integration/admin/token', data);


        return res.status(200).json({
            token: response.data
        });
    } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data);
        if (err.response.status == 401) {


            return res.status(401).json({
                message: "Tài khoản hoặc mật khẩu không đúng"
            });
        };

    }
}

exports.login_app = async (req, res) => {
    const data = {
        username: req.body.email,
        password: req.body.password,
    };

    try {

        const response = await axios.post(`${BaseURL}`+'/integration/customer/token', data);



        const config = {
            headers: {
                'Authorization': `Bearer ${response.data}`
            }
        };

        const customer_info = await axios.get(`${BaseURL}`+'/customers/me', config);

        return res.status(200).json({
            token: response.data,
            customer_info: customer_info.data
        });



    } catch (err) {

        try {

            const response = await axios.post(`${BaseURL}`+'/integration/admin/token', data);


            return res.status(200).json({
                token: response.data
            });
        } catch (err1) {
            console.log(err1.response.status);
            console.log(err1.response.data);
            if (err1.response.status == 401) {


                return res.status(401).json({
                    message: "Tài khoản hoặc mật khẩu không đúng"
                });
            };

        }

        console.log(err.response.status);
        console.log(err.response.data);
        if (err.response.status == 401) {
            User.getByEmail(data.username, function (cusss) {
                console.log(cusss[0]);
                if (cusss[0] && cusss[0].confirmation != null) {
                    return res.status(402).json({
                        message: "Tài khoản chưa xác thực"
                    });
                } else return res.status(401).json({
                    message: "Tài khoản hoặc mật khẩu không đúng"
                });
            });
        }


    }
}
