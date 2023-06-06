var axios = require('axios');

exports.create_order = async (req, res) => {
    try {
        console.log(req.body);
        const data = {
            customer: {
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            },
            password: req.body.password
        };

        const response = await axios.post('http://192.168.1.9:80/magento2/rest/V1/customers', data);

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
