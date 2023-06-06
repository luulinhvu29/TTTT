const db = require('../common/connect');

const Product = function(product){
    this.entity_id = product.entity_id;
    this.type_id = product.type_id;
    this.sku = product.sku;


};

Product.get_all = function(result){
    db.query("SELECT * FROM catalog_product_entity", function(err, product){
        if(err){
            result(null);
        }
        else {
            result(product);
        }
    });

};

Product.getName = function(id,result){
    db.query("SELECT n.value FROM catalog_product_entity_varchar n, eav_attribute e WHERE e.attribute_code = 'name' and e.attribute_id = n.attribute_id and n.entity_id = ?",id,function(err, name){
        if(err){
            result(null);
        }
        else {
            result(name[0].value);
        }
    });
    
};

// User.getById = function(id, result){

//     db.query("SELECT * FROM customer_entity where entity_id=?",id, function(err, user){

//         if(err || user.length == 0){
//             result(null);
//         }
//         else {
//             result(user);
//         }
//     });
// };



module.exports = Product;