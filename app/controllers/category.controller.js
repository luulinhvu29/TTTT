var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

exports.get_cate = async function(req,res){                 
        try {           

            const response = await axios.get(`${BaseURL}`+'/categories');

            return res.status(200).json({
                product_in_cart: response.data
            });
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
            res.json({success:false,message: "Loi roi"});
        }     
    
};