var axios = require('axios');

const BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';
const verifytoken=(req,res,next)=>{
    const authHeader=req.header('Authorization')
    const Token=authHeader && authHeader.split(' ')[1]
    if(!Token)
    return res.status(401).json({success:false,message:"Access token not found"})
    try {
        const decode=jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
        req.user=decode
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({success:false,message:"internal server error"})
    }
};

exports.get_cart = async function(req,res){          

        const authHeader=req.header('Authorization');

        if(!authHeader)
            return res.status(401).json({success:false,message:"Access token not found"});        
        try {
            const config = {
                headers: {
                    'Authorization': authHeader
                }
            };

            const response = await axios.get(`${BaseURL}`+'/carts/mine/items',config);

            for(i=0;i<response.data.length;i++){
                const img = await axios.get(`${BaseURL}`+'/products/'+response.data[i].sku,config);
                response.data[i].img = img.data.media_gallery_entries[0].file;
            }

            return res.status(200).json({
                product_in_cart: response.data
            });
        } catch (error) {
            console.log(error);
            res.json({success:false,message: "Loi roi"});
        }     
    
};

exports.add_to_cart = async function(req,res){          

    const authHeader=req.header('Authorization');

    console.log(authHeader);
    if(!authHeader)
        return res.status(401).json({success:false,message:"Access token not found"});
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

        const quote = await axios.post(`${BaseURL}/carts/mine`,data,config);

        const response = await axios.post(`${BaseURL}/carts/mine/items`,data,config); 
        
        return res.status(200).json({
            product_in_cart: response.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        if(error.response.status == 400){
            return res.status(400).json({message:"Số lượng thêm vào không hợp lệ"});
        }
        if(error.response.status == 403){
            return res.status(403).json({success:false,message:"internal server error"});
        }

        if(error.response.status == 401){
            return res.status(401).json({success:false,message:"Access token het han, dang nhap lai"});
        }
        
    }     

};

exports.change_qty = async function(req,res){          

    const authHeader=req.header('Authorization');

    console.log(authHeader);
    if(!authHeader)
        return res.status(401).json({success:false,message:"Access token not found"});
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

        const response = await axios.put(`${BaseURL}/carts/mine/items/`+item,data,config); 
        
        return res.status(200).json({
            product_in_cart: response.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        
        if(error.response.status == 400){
            return res.status(400).json({message:"Số lượng thay đổi không hợp lệ"});
        }

        if(error.response.status == 404){
            return res.status(404).json({message:"Khong tim thay san pham trong gio hang"});
        }

        if(error.response.status == 403){
            return res.status(403).json({success:false,message:"internal server error"});
        }
        
    }     

};

exports.delete_cart = async function(req,res){          

    const authHeader=req.header('Authorization');

    console.log(authHeader);
    if(!authHeader)
        return res.status(401).json({success:false,message:"Access token not found"});
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };

        const item = req.params.item_id;

        console.log(item);

        const response = await axios.delete(`${BaseURL}/carts/mine/items/`+item,config); 

        const cart =  await axios.get(`${BaseURL}/carts/mine/items/`,config); 
        
        return res.status(200).json({
            product_in_cart: cart.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        
        if(error.response.status == 400){
            return res.status(400).json({message:"???"});
        }

        if(error.response.status == 404){
            return res.status(404).json({message:"Khong tim thay san pham"});
        }

        if(error.response.status == 403){
            return res.status(403).json({success:false,message:"internal server error"});
        }
        
    }     

};

exports.delete_all_cart = async function(req,res){          

    const authHeader=req.header('Authorization');

    console.log(authHeader);
    if(!authHeader)
        return res.status(401).json({success:false,message:"Access token not found"});
    try {
        const config = {
            headers: {
                'Authorization': authHeader
            }
        };
    
        const cart =  await axios.get(`${BaseURL}/carts/mine/items/`,config);

        var ci = [];

        for(i=0;i<cart.data.length;i++){
            ci[i]=cart.data[i].item_id;
        }

        console.log(ci);

        for(i=0;i<cart.data.length;i++){
            const response = await axios.delete(`${BaseURL}/carts/mine/items/`+ci[i],config); 
        }
        

        const cart1 =  await axios.get(`${BaseURL}/carts/mine/items/`,config); 
        
        return res.status(200).json({
            product_in_cart: cart1.data
        });
    } catch (error) {
        console.log(error.response.status);
        console.log(error.response.data);
        
        if(error.response.status == 400){
            return res.status(400).json({message:"???"});
        }
        if(error.response.status == 403){
            return res.status(403).json({success:false,message:"internal server error"});
        }
        
    }     

};