import axios from "axios";

const set_shipping_address = async (req, res) => {
    try {

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
           country_id: req.body.country_id,
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
           country_id: req.body.country_id,
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

    const set_address = await axios.post('http://localhost/magento2/rest/V1/carts/mine/shipping-information', data, config);

    console.log(set_address.data)

    return res.status(201).json({
        message: "Set address successful"
    })

    } catch (err) {
        console.log(err)
    }
}

const check_out_cart = async (req, res) => {
    try {

    const data = {
        paymentMethod: "checkmo"
    }

    const customer_token = req.get('authorization');

    const config = {
        headers: {
            'Authorization': customer_token
        }
    }

    const place_order = await axios.post('http://localhost/magento2/rest/V1/carts/mine/payment-information', data, config);

    console.log(place_order.data)

    return res.status(201).json({
        message: "Place order successfully",
        order_id: place_order.data
    })

    } catch (err) {
        console.log(err)
    }
}


export {
    set_shipping_address,
    check_out_cart
}