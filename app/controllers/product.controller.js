var Product = require('../models/product.model');
var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

exports.get_all_product = async function (req, res) {
    try {

        var cp = req.query.currentPage;

        const response = await axios.get(`http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria[pageSize]=2&searchCriteria[currentPage]=${cp}`);

        lamtr = Math.round(response.data.total_count / 2);

        //console.log(lamtr);

        for(i=0;i<response.data.items.length;i++){

            const quantity = await axios.get(`http://192.168.1.9:80/magento2//rest/V1/stockStatuses/${response.data.items[i].sku}`);
            response.data.items[i].qty = quantity.data.qty;
            response.data.items[i].stock_status = quantity.data.stock_status;
        }

        return res.status(200).json({
            totalPage: lamtr,
            product: response.data
        });
    } catch (err) {
        console.log(err);
       // console.log(err.response.data);
        return res.status(401).json({
            message: 'Token het han, dang nhap lai'
        });
    }
};

exports.get_detail_product = async function (req, res) {
    try {
        const response = await axios.get('http://192.168.1.9:80/magento2/rest/V1/products/' + req.params.sku);

        const category = [];

        for( i =0; i<response.data.extension_attributes.category_links.length; i++){
            const cate = await axios.get('http://192.168.1.9:80/magento2/rest/V1/categories/' + response.data.extension_attributes.category_links[i].category_id);
            category[i] = cate.data.name;
        }

        const quantity = await axios.get(`http://192.168.1.9:80/magento2//rest/V1/stockStatuses/` + req.params.sku);
        response.data.qty = quantity.data.qty;
        response.data.stock_status = quantity.data.stock_status;
        response.data.category = category;

        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err.response.status);
        
    }
};

exports.get_featured_product = async function (req, res) {
    try {
        const response = await axios.get('http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][condition_type]=eq');

        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data);

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

        return res.status(401).json({
            message: 'Token het han, dang nhap lai'
        });
    }
};

exports.get_product_by_price = async function (req, res) {
    try {


        const min = req.query.min ?? 0;       

        const max = req.query.max ?? 99999999999999;

        const type = req.query.type ?? 'ASC';
 

        const response = await axios.get(`http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria[filter_groups][0][filters][0][field]=price&searchCriteria[filter_groups][0][filters][0][value]=${min}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt&searchCriteria[filter_groups][1][filters][0][field]=price&searchCriteria[filter_groups][1][filters][0][value]=${max}&searchCriteria[filter_groups][1][filters][0][condition_type]=lt&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=${type}`);

        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data);

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }

        return res.status(401).json({
            message: 'Token het han, dang nhap lai'
        });
    }
};

exports.get_product_name = async function (req, res) {
    if(req.params.value != null){
        try {
            const value = req.params.value;
    
            const response = await axios.get(`http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%${value}%&searchCriteria[filterGroups][0][filters][0][condition_type]=like`);
    
            return res.status(200).json({
                product: response.data
            });
        } catch (err) {
            console.log(err.response.status);
            console.log(err.response.data);

            if (error.response.status == 401) {
                return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
            }

            return res.status(401).json({
                message: 'Token het han, dang nhap lai'
            });
        }
    }
};

exports.get_product_filter = async function (req, res) {
    try {
        const search = req.params.search;
        const value = req.params.value;

        const response = await axios.get(`http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria[filterGroups][0][filters][0][field]=${search}&searchCriteria[filterGroups][0][filters][0][value]=${value}&searchCriteria[filterGroups][0][filters][0][condition_type]=eq`);

        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err.response.status);
        console.log(err.response.data);

        if (error.response.status == 401) {
            return res.status(401).json({ success: false, message: "Access token het han, dang nhap lai" });
        }
        
        return res.status(401).json({
            message: 'Token het han, dang nhap lai'
        });
    }
};

exports.get_all_producttt = async function (req, res) {
    try {
        const response = await axios.get(`http://192.168.1.9:80/magento2/rest/V1/products?searchCriteria`);

        for(i=0;i<response.data.total_count;i++){

            const quantity = await axios.get(`http://192.168.1.9:80/magento2//rest/V1/stockStatuses/${response.data.items[i].sku}`);
            response.data.items[i].qty = quantity.data.qty;
            response.data.items[i].stock_status = quantity.data.stock_status;
        }
        

        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err);
        // console.log(err.response.status);
        // console.log(err.response.data);
        return res.status(401).json({
            message: 'Token het han, dang nhap lai'
        });
    }
};