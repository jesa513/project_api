const conn = require('../database');
var fs = require('fs');
var { uploader } = require('../helpers/uploader');



module.exports = {

    datacustomer: (req,res) => {
    var sql = 'SELECT * from customer;';
    conn.query(sql, (err, results) => {
        if(err) throw err;
        // console.log(results);
        
        res.send(results);
    })   
}
}