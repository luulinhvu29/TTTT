var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

exports.get_cate = async function (req, res) {
    try {

        const response = await axios.get(`${BaseURL}` + '/categories/1');

        //console.log(response.data.children);
        const a = response.data.children;

        const mangChuoi = a.split(",");

        console.log("a: ", mangChuoi);


        cate = [];

        for (i = 0; i < mangChuoi.length; i++) {
            c = await axios.get(`${BaseURL}` + `/categories/${mangChuoi[i]}`);

            cate[i] = c.data;
            cate[i].child = [];
        }

        for (i = 0; i < cate.length; i++) {
            if (cate[i].children) {
                //c = await axios.get(`${BaseURL}` + `/categories/${b[i]}`);

                p = 0;
                for (j = 0; j < cate[i].children.length; j++) {
                    if (cate[i].children[j] != ',') {
                        c = await axios.get(`${BaseURL}` + `/categories/${cate[i].children[j]}`);
                        cate[i].child[p] = c.data;
                        p++;
                    }
                }

            }
        }



        return res.status(200).json({
            category: cate
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error);
            // console.log(error.response.data);
            //res.json({ success: false, message: "Loi roi" });
        }
    }

};