var Product = require('../models/product.model');
var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

exports.get_all_product = async function (req, res) {
    try {

        var cp = req.query.currentPage;


        const min = req.query.min ?? 0;
        const max = req.query.max ?? 9999999999;

        const sortType = req.query.sortType;
        const sortValue = req.query.sortValue;

        //console.log("body", req.query);

        var api = `${BaseURL}`+`/products?searchCriteria[pageSize]=10&searchCriteria[currentPage]=${cp}&searchCriteria[filter_groups][0][filters][0][field]=price&searchCriteria[filter_groups][0][filters][0][value]=${min}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt&searchCriteria[filter_groups][1][filters][0][field]=price&searchCriteria[filter_groups][1][filters][0][value]=${max}&searchCriteria[filter_groups][1][filters][0][condition_type]=lt`

        if (sortType) {
            if (sortValue) {
                api = api + `&searchCriteria[sortOrders][0][field]=${sortType}&searchCriteria[sortOrders][0][direction]=${sortValue}`;
            } else {
                api = api + `&searchCriteria[sortOrders][0][field]=${sortType}&searchCriteria[sortOrders][0][direction]=ASC`;
            }
        }

        //console.log("api: ", api);

        const response = await axios.get(api);



        if (response.data.total_count % 10 == 0) {
            lamtr = Math.round(response.data.total_count / 10);
        } else {
            lamtr = Math.round(response.data.total_count / 10) + 1;
        }

        console.log("lamtr", lamtr);

        for (i = 0; i < response.data.items.length; i++) {

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
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
            return res.status(400).json({
                message: 'chua co current page'
            });
        }

    }
};

exports.get_detail_product = async function (req, res) {
    try {
        const response = await axios.get(`${BaseURL}`+'/products/' + req.params.sku);

        const category = [];

        for (i = 0; i < response.data.extension_attributes.category_links.length; i++) {
            const cate = await axios.get(`${BaseURL}`+'/categories/' + response.data.extension_attributes.category_links[i].category_id);
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
        console.log(err);

    }
};

exports.get_featured_product = async function (req, res) {
    try {
        const response = await axios.get(`${BaseURL}`+'/products?searchCriteria[filterGroups][0][filters][0][field]=featured&searchCriteria[filterGroups][0][filters][0][value]=1&searchCriteria[filterGroups][0][filters][0][condition_type]=eq');

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


        const response = await axios.get(`${BaseURL}`+`/products?searchCriteria[filter_groups][0][filters][0][field]=price&searchCriteria[filter_groups][0][filters][0][value]=${min}&searchCriteria[filter_groups][0][filters][0][condition_type]=gt&searchCriteria[filter_groups][1][filters][0][field]=price&searchCriteria[filter_groups][1][filters][0][value]=${max}&searchCriteria[filter_groups][1][filters][0][condition_type]=lt&searchCriteria[sortOrders][0][field]=price&searchCriteria[sortOrders][0][direction]=${type}`);

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

    try {
        const value = req.query.name ?? '';

        const type = req.query.type ?? 'ASC';

        const response = await axios.get(`${BaseURL}`+`/products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%${value}%&searchCriteria[filterGroups][0][filters][0][condition_type]=like&searchCriteria[sortOrders][0][field]=name&searchCriteria[sortOrders][0][direction]=${type}`);

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

exports.get_product_filter = async function (req, res) {
    try {
        const search = req.params.search;
        const value = req.params.value;

        const response = await axios.get(`${BaseURL}`+`/products?searchCriteria[filterGroups][0][filters][0][field]=${search}&searchCriteria[filterGroups][0][filters][0][value]=${value}&searchCriteria[filterGroups][0][filters][0][condition_type]=eq`);

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
        const response = await axios.get(`${BaseURL}`+`/products?searchCriteria`);

        for (i = 0; i < response.data.total_count; i++) {

            const quantity = await axios.get(`http://192.168.1.9:80/magento2//rest/V1/stockStatuses/${response.data.items[i].sku}`);
            response.data.items[i].qty = quantity.data.qty;
            response.data.items[i].stock_status = quantity.data.stock_status;
        }


        return res.status(200).json({
            product: response.data
        });
    } catch (err) {
        console.log(err);

    }
};

exports.get_related_product = async function (req, res) {
    try {
        const response = await axios.get(`${BaseURL}`+'/products/' + req.params.sku);

        const pro = [];

        var n = 0;

        for (i = 0; i < response.data.extension_attributes.category_links.length; i++) {
            const cate = await axios.get('http://192.168.1.9:5000/product/search/category_id/' + response.data.extension_attributes.category_links[i].category_id);
            //console.log(cate.data.product.items);
            for (j = 0; j < cate.data.product.items.length; j++) {
                if (cate.data.product.items[j].sku != req.params.sku) {
                    pro.push(cate.data.product.items[j]);
                    n++;
                    //console.log("pro", n, cate.data.product.items[j]);
                }
            }
        }
        //console.log("pro", pro);

        return res.status(200).json({
            total_related_product: n,
            related_product: pro
        });
    } catch (err) {
        console.log(err);

    }
};