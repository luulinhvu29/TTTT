import axios from "axios";

const get_orders_by_email = async (req, res) => {
    try {
        const data = {
            username: 'admin',
            password: 'admin123'
        }

        const customer_email = req.params.email;

        const access_token = await axios.post('http://localhost/magento2/rest/default/V1/integration/admin/token',data);

        const config = {
            headers: {
                'Authorization': `Bearer ${access_token.data}`
            }
        }

        const orders = await axios.get(`http://localhost/magento2/rest/default/V1/orders?searchCriteria[filterGroups][0][filters][0][field]=customer_email&searchCriteria[filterGroups][0][filters][0][value]=${customer_email}`, config);

        return res.status(200).json({
            orders: orders.data.items
        })
    } catch (err) {
        console.log(err.response)
    }
}

export {
    get_orders_by_email
}