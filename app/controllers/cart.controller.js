var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';
const verifytoken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const Token = authHeader && authHeader.split(' ')[1]
    if (!Token)
        return res.status(401).json({ success: false, message: "Access token not found" })
    try {
        const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({ success: false, message: "internal server error" })
    }
};

exports.get_cart = async function (req, res) {

    const authHeader = req.header('Authorization');

    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        const response = await axios.get(`${BaseURL}` + '/carts/mine/items', config);

        const img1 = await axios.get(`${BaseURL}` + '/products?searchCriteria&fields=items[sku,media_gallery_entries[file]]');

        const img = img1.data.items;
       

        for (i = 0; i < response.data.length; i++) {
            
            for(im = 0; im < img.length; im++){
               
                if(img[im].sku == response.data[i].sku){
                    
                    response.data[i].img = [];
                    for(tt = 0; tt < img[im].media_gallery_entries.length; tt++){
                        
                        response.data[i].img[tt] = img[im].media_gallery_entries[tt].file;
                    }
                    break;
                }
            }
            
        }

        return res.status(200).json({
            product_in_cart: response.data
            
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);

            console.log(error);

            if (error.response.status == 404) {
                return res.status(404).json({ success: false, message: "Khong co gio hang" });
            }
            
        }else{
            console.log(error);
        }


    }

};

exports.add_to_cart = async function (req, res) {

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
            cartItem: {
                sku: req.body.sku,
                qty: req.body.qty
            }
        };

        const quote = await axios.post(`${BaseURL}/carts/mine`, data, config);

        const response = await axios.post(`${BaseURL}/carts/mine/items`, data, config);

        return res.status(200).json({
            product_in_cart: response.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        if (error.response.status == 400) {
            return res.status(400).json({ message: "Số lượng thêm vào không hợp lệ" });
        }
        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "internal server error" });
        }

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

    }

};

exports.change_qty = async function (req, res) {

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
            cartItem: {
                sku: req.body.sku,
                qty: req.body.qty
            }
        };

        const item = req.body.item_id;

        const response = await axios.put(`${BaseURL}/carts/mine/items/` + item, data, config);

        return res.status(200).json({
            product_in_cart: response.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);

        if (error.response.status == 400) {
            return res.status(400).json({ message: "Số lượng thay đổi không hợp lệ" });
        }

        if (error.response.status == 404) {
            return res.status(404).json({ message: "Khong tim thay san pham trong gio hang" });
        }

        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "internal server error" });
        }

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

    }

};

exports.delete_cart = async function (req, res) {

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

        const item = req.params.item_id;

        console.log(item);

        const response = await axios.delete(`${BaseURL}/carts/mine/items/` + item, config);

        const cart = await axios.get(`${BaseURL}/carts/mine/items/`, config);

        return res.status(200).json({
            product_in_cart: cart.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);

        if (error.response.status == 400) {
            return res.status(400).json({ message: "???" });
        }

        if (error.response.status == 404) {
            return res.status(404).json({ message: "Khong tim thay san pham" });
        }

        if (error.response.status == 403) {
            return res.status(403).json({ success: false, message: "internal server error" });
        }

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

    }

};

exports.delete_all_cart = async function (req, res) {

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

        const cart = await axios.get(`${BaseURL}/carts/mine/items/`, config);

        var ci = [];

        for (i = 0; i < cart.data.length; i++) {
            ci[i] = cart.data[i].item_id;
        }

        console.log(ci);

        for (i = 0; i < cart.data.length; i++) {
            const response = await axios.delete(`${BaseURL}/carts/mine/items/` + ci[i], config);
        }


        const cart1 = await axios.get(`${BaseURL}/carts/mine/items/`, config);

        return res.status(200).json({
            product_in_cart: cart1.data
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

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }
    }

};

exports.cart_info = async function (req, res) {

    const authHeader = req.header('Authorization');


    if (!authHeader)
        return res.status(401).json({ success: false, message: "Access token not found" });
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        const cart = await axios.get(`${BaseURL}`+'/carts/mine/', config);

        return res.status(200).json({
            product_in_cart: cart.data
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

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

    }

};


exports.set_shipping_address = async (req, res) => {
    try {

        console.log(req.body);

        const data =
        {
            addressInformation: {
                shipping_address: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    street: [
                        ...req.body.street
                    ],
                    city: req.body.city,
                    postcode: req.body.postcode,
                    countryId: req.body.countryId,
                    telephone: req.body.telephone,
                    email: req.body.email
                },
                billing_address: {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    street: [
                        ...req.body.street
                    ],
                    city: req.body.city,
                    postcode: req.body.postcode,
                    countryId: req.body.countryId,
                    telephone: req.body.telephone,
                    email: req.body.email
                },
                shipping_method_code: "flatrate",
                shipping_carrier_code: "flatrate"
            }
        }



        const customer_token = req.get('authorization');

        const config = {
            headers: {
                'Authorization': customer_token
            }
        }

        const set_address = await axios.post(`${BaseURL}`+'/carts/mine/shipping-information', data, config);


        return res.status(201).json({
            message: "Set address successful"
        })

    } catch (err) {
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);

            if (err.response.status == 400) {
                return res.status(400).json({ success: false, message: "Thieu truong" });
            }

            if (err.response.status == 401) {
                return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
            }
        } else {
            console.log(err);
            return res.status(400).json({ success: false, message: "Thieu truong" });
        }

        
    }
}

exports.check_out_cart = async (req, res) => {
    try {

        const data = {
            paymentMethod: {
                method: req.body.method
            }
        };

        const customer_token = req.get('authorization');

        const config = {
            headers: {
                'Authorization': customer_token
            }
        }

        const place_order = await axios.post(`${BaseURL}`+'/carts/mine/payment-information', data, config);

        console.log(place_order.data)

        return res.status(200).json({
            message: "Place order successfully",
            order: place_order.data
        });

    } catch (err) {

        if(err.response){
            console.log(err.response.status);
            console.log(err.response.data);
    
            if (err.response.status == 400) {
                return res.status(400).json({ message: "Phuong thuc thanh toan khong hop le" });
            }
    
            if (err.response.status == 401) {
                return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
            }
    
            if (err.response.status == 404) {
                return res.status(404).json({ success: false, message: "Khong co gio hang" });
            }
        }else{
            return res.status(405).json({ message: "retry pleaseee" });
        }
    
        
    }
}