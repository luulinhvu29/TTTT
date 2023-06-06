var Book = require('../models/book.model');

exports.get_list = function(req,res){
    Book.get_all(function(data){
        res.send({result: data});
    });    
};

exports.detail = function(req,res){
    Book.getById(req.params.id, function (respnse){
        res.send({result: respnse});
    });    
};

exports.add_book = function (req, res){
    var data = req.body;
    Book.create(data, function(respnse){
        res.send({result: respnse});
    });
};

// exports.remove_book = function (req, res){
//     var id = req.params.id;
//     Book.remove(id, function(respnse){
//         res.send({result: respnse});
//     });
// };

exports.remove_book = function (req, res){
    var id = req.body.id;
    Book.remove(id, function(respnse){
        res.send({result: respnse});
    });
};

exports.update_book = function (req, res){
    var data = req.body;
    Book.update(data, function(respnse){
        res.send({result: respnse});
    });
};