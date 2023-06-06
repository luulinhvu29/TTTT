var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'magento_2'
});

connection.connect(function(err){
    if(err) {
        console.log("Ket noi CSDL khong thanh cong. Err: " +err );
    }else{
        console.log("Da ket noi CSDL thanh cong. Err: " );
    }
});

module.exports = connection;