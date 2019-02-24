const conn = require('../database');
var fs = require('fs');
var { uploader } = require('../helpers/uploader');



module.exports = {

    cart: (req,res) => {

        var dataCart = {
            username: req.body.username,
            productId: req.body.productId,
            productname: req.body.productname,
            price: req.body.price,
            quantity: req.body.quantity
           
        }

        sql = `INSERT into cart SET ?`
        conn.query(sql,dataCart, (err1,results1) =>{
            if(err1) 
                throw err1
                // res.semd({status : 'error', message: 'System Error'});
             res.send(results1);
        }
        )
},

daftarcart: (req,res) => {
    var username = req.params.username;
    console.log(username)
    var sql = `SELECT * from cart where username = '${username}';`
    conn.query(sql, (err,results) =>{
        if(err) {
            console.log('error dari query')
            throw err
        }
        console.log(results)
        res.send(results)

        } 
       )
     },

     deletecart: (req,res) => {
        console.log(req.params.id);
        var sql = `SELECT * FROM cart WHERE id = '${req.params.id}';`;
        conn.query(sql, (err, results) => {
            if(err) {
                return res.status(500).json({ 
                    message: "There's an error on the server. Please contact the administrator.", 
                    error: err.message });
            }
            
            if(results.length > 0) {
                sql = `DELETE FROM cart WHERE id = '${req.params.id}';`
                conn.query(sql, (err1,results1) => {
                    if(err1) {
                        return res.status(500).json({ 
                            message: "There's an error on the server. Please contact the administrator.", 
                            error: err1.message });
                    }
                    res.send(results1);
                })
            }
        })   
    
    },

    editcart: (req,res) => {
        var sql = `SELECT * FROM cart WHERE id = '${req.params.id}';`;
        conn.query(sql, (err, results) => {
            if(err) 
            console.log (err);
    
            if(results.length > 0) {
                try {

                    var ganticart = {
                        // productname: req.body.productname,
                        // price: req.body.price,
                        quantity: req.body.quantity
                    }

                    sql = `UPDATE cart SET ? WHERE id = '${req.params.id}';`
                    conn.query(sql, ganticart, (err1,results1) => {
                        if(err1) {
                            return res.status(500).json({ 
                                message: "There's an error on the server. Please contact the administrator.", 
                                error: err1.message 
                            });
                        }
                        res.send(results1);
                    })
                }
                catch(err){
                    return res.status(500).json({ 
                        message: "There's an error on the server. Please contact the administrator.", 
                        error: err.message 
                    });
                }
            }
        })
    },

    datatransaksi: (req,res) => {

        var dttransaksi = {
            username: req.body.username,
            tglTransaksi: new Date(),
            totalPrice: req.body.totalPrice,
            totalItem: req.body.totalItem
           
        }
                sql = `INSERT into datatransaksi SET ?`
                conn.query(sql,dttransaksi, (err2,results2) =>{
                    if(err2) 
                    console.log(results.idtransaksi)
                    res.send(results2)
                  

                // res.semd({status : 'error', message: 'System Error'});
                
                }
            ) 
       },

       transaksiitem: (req,res) => {

        var transaction = {
            transaksiId: req.body.transaksiId,
            productId: req.body.productId,
            productname: req.body.productname,
            price: req.body.price,
            quantity: req.body.quantity
        }
    
                sql = `INSERT into transaksiitem SET ?`
                conn.query(sql,transaction, (err2,results2) =>{
                    if(err2) {
                        console.log(`error pertama ${err2}`)
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                    }
                // res.semd({status : 'error', message: 'System Error'});
                   // res.send(results2);
    
                sql = `select * from transaksiitem;`;
                conn.query(sql,(err3,results3) => {
                    if(err3)
                    console.log(`error kedua ${err3}`)
                    res.send(results3);
    
                  })
                    
                }
            )
       },

       hapusdaftarcart: (req,res) => {
        var sql = `SELECT * FROM cart WHERE username = '${req.params.username}';`
        conn.query(sql, (err, results) => {
            if(err) {
                console.log(`error ketiga ${err}`)
                return res.status(500).json({ 
                    message: "There's an error on the server. Please contact the administrator.", 
                    error: err.message });
            }
            
            if(results.length > 0) {
                sql = `DELETE FROM cart WHERE username = '${req.params.username}';`
                conn.query(sql, (err1,results1) => {
                    if(err1) {
                        console.log(`error keempat ${err1}`)
                        return res.status(500).json({ 
                            message: "There's an error on the server. Please contact the administrator.", 
                            error: err1.message });
                    }
                    res.send(results1);
                })
            }
        })   
    
    }


}




//         var id = req.params.id;
//         console.log(id)
//         var sql = `delete from cart where id = ${req.params.id}`;
//         conn.query(sql, (err,results) =>{
//             if(err) {
//                 console.log('error dari query')
//             }
//             console.log(results)
    
//             } 
//            )
//          }

//    }





            // res.send({status : 'error', message: 'System Error'});
    //         var username  = results[0].username;
 
    //           sql = `SELECT * from cart where username = ${username};`
    //                     conn.query(sql, (err,results4) => {
    //                         if(err) throw err;
    //                         console.log(results4)
    // }
    // )