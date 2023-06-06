module.exports = function(router){
    var homeController = require('../controllers/home.controller'); 
    var JWT = require("../common/_JWT");

    router.get("/", homeController.home);

    router.get("/login", async function(req,res){
        var user = {
            name: "Admin",
            email: "admin@gmail.com",
        };
        const _token = await JWT.make(user);
        res.send({token: _token});
    });

    router.get("/check_token", async function(req,res){
        try{
            var _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0sImlhdCI6MTY4NDI5NDkxNSwiZXhwIjoxNjg0Mjk4NTE1fQ.57yplhQrsAsS9mEZl-30T-X1T6YAgCGBC6641X2mp24";
            const data = await JWT.check(_token);
            res.send({data: data});
        }catch(err){
            res.send({data: "Ma token khong hop le"});
        }
        
    });
};