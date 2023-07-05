var express = require('express');
// const multer  = require('multer');
// const upload = multer({ dest: 'G:\\xampp\\htdocs\\magento2\\pub\\media\\catalog\\blog' });
var cors = require('cors');
var app = express();
//bodyparser
var bodyParser = require('body-parser');

var BaseURL = 'http://192.168.1.9:80/magento2/rest/V1';

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());


require('./app/routes/home.router')(app);
require('./app/routes/account.router')(app);


require('./app/routes/book.router')(app);
require('./app/routes/user.router')(app);
require('./app/routes/product.router')(app);
require('./app/routes/cart.router')(app);
require('./app/routes/blog.router')(app);
require('./app/routes/order.router')(app);
require('./app/routes/category.router')(app);


app.listen(5000, '192.168.1.9', function(){
    console.log("listening on: http://192.168.1.9:5000");
});