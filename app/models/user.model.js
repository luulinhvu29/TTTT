const db = require('../common/connect');

const User = function(user){
    this.entity_id = user.id;

    this.email = user.email;

};

User.get_all = function(result){
    db.query("SELECT * FROM customer_entity", function(err, user){
        if(err){
            result(null);
        }
        else {
            result(user);
        }
    });

};

User.getById = function(id, result){

    db.query("SELECT * FROM customer_entity where entity_id=?",id, function(err, user){

        if(err || user.length == 0){
            result(null);
        }
        else {
            result(user);
        }
    });
};

User.getByEmail = function(email, result){

    db.query("SELECT * FROM customer_entity where email = ?",email, function(err, user){

        if(err){
            result(err);
        }
        else {
            result(user);
        }
    });
};

User.getOrderByUserId = function(id, result){

    db.query("SELECT * FROM sales_order where entity_id=?",id, function(err, user){

        if(err || user.length == 0){
            result(null);
        }
        else {
            result(user);
        }
    });
};

User.create = function(data, result){
    db.query("INSERT INTO customer SET ?",data, function(err, user){
 
        if(err ){
            result(null);
        }
        else {
            result({id: user.insertId, ...data});
        }
    });
};

User.remove = function(id, result){
    db.query("DELETE from customer WHERE customer_id = ?",id, function(err, id){
 
        if(err ){
            result(null);
        }
        else {
            result("Da xoa user co id = "+id);
        }
    });
};

User.update = function(data, result){
    db.query("UPDATE customer SET customer_name = ?,customer_email = ?,customer_password = ? WHERE customer_id = ?",
        [data.customer_name,data.customer_email,data.customer_password,data.customer_id], 
        function(err){
 
            if(err){
                result(null);
            }
            else {        
                result("Da cap nhat user co id = " +data.id);
            }
        }
    );
};

User.check_login = function(data,result){
    console.log(data.customer_email, data.customer_password);
    db.query("SELECT * FROM customer WHERE customer_email = ? AND customer_password = ?",[data.customer_email, data.customer_password], 
    function(err, user){
        if(err || user.length == 0){
            result(null);
        }else{
            result(user[0]);
        };
    });
};

User.get_admin_user = function(result){
    db.query("SELECT * FROM admin_user", function(err, user){
        if(err){
            result(err);
        }
        else {
            result(user);
        }
    });

};

module.exports = User;