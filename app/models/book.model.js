const db = require('../common/connect');

const Book = function(book){
    this.id = book.id;
    this.name = book.name;    
    this.author_id = book.author_id;
};

Book.get_all = function(result){
    db.query("SELECT * FROM book", function(err, book){
        if(err){
            result(null);
        }
        else {
            result(book);
        }
    });

};

Book.getById = function(id, result){

    db.query("SELECT * FROM book WHERE id=?",id, function(err, book){

        if(err || book.length == 0){
            result(null);
        }
        else {
            result(book[0]);
        }
    });
};

Book.create = function(data, result){
    db.query("INSERT INTO book SET ?",data, function(err, book){
 
        if(err ){
            result(null);
        }
        else {
            result({id: book.insertId, ...data});
        }
    });
};

Book.remove = function(id, result){
    db.query("DELETE from book WHERE id = ?",id, function(err, id){
 
        if(err ){
            result(null);
        }
        else {
            result("Da xoa book co id = "+id);
        }
    });
};

Book.update = function(data, result){
    db.query("UPDATE book SET name = ?,author_id = ? WHERE id = ?",[data.name,data.author_id,data.id], function(err){
 
        if(err){
            result(null);
        }
        else {        
            result("Da cap nhat book co id = " +data.id);
        }
    });
};

module.exports = Book;