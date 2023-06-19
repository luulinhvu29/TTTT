var axios = require('axios');

exports.get_order = async (req, res) => {
    try {
        const data = {
            username: 'admin',
            password: 'admin123'
        }

        const token = req.header('Authorization');

        const config1 = {
            headers: {
                'Authorization': token
            }
        }

        const customer_info = await axios.get('http://localhost/magento2/rest/default/V1/customers/me',config1);

        console.log(customer_info.data.email);

        const access_token = await axios.post('http://localhost/magento2/rest/default/V1/integration/admin/token',data);

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token.data}`
            }
        }

        const orders = await axios.get(`http://localhost/magento2/rest/default/V1/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_email&searchCriteria[filterGroups][0][filters][0][value]=${customer_info.data.email}`, config);

        return res.status(200).json({
            orders: orders.data.items
        })
    } catch (err) {
        console.log(err.response);

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }
    }
};


exports.get_order_detail = async (req, res) => {
    try {
        const data = {
            username: 'admin',
            password: 'admin123'
        }

        const token = req.header('Authorization');

        const config1 = {
            headers: {
                'Authorization': token
            }
        }

        const customer_info = await axios.get('http://localhost/magento2/rest/default/V1/customers/me',config1);

        console.log(customer_info.data.email);

        const access_token = await axios.post('http://localhost/magento2/rest/default/V1/integration/admin/token',data);

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token.data}`
            }
        }

        const orders = await axios.get(`http://localhost/magento2/rest/default/V1/orders/${req.params.order_id}?searchCriteria`, config);

        return res.status(200).json({
            orders: orders.data
        })
    } catch (err) {
        console.log(err.response);

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }
    }
};
